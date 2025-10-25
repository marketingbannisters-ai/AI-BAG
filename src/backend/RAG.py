# ...existing code...
import langchain
# Ensure compatibility: langchain_core expects langchain.verbose
if not hasattr(langchain, "verbose"):
    langchain.verbose = False


# IMPORTING PACKAGES #
import os
from pydantic import BaseModel, Field
from datetime import date
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chat_models import init_chat_model
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone
from langchain_core.documents import Document
from langchain import hub
from typing_extensions import List, Dict, Optional, Literal, Any, TypedDict
from langgraph.graph import START, StateGraph
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.documents import Document

# CONNECTIONS / SETTING ENVIRONMENT VARIABLES #
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_API_KEY"] = "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"
if not os.environ.get("OPENAI_API_KEY"):
  os.environ["OPENAI_API_KEY"] = "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"
pc = Pinecone(api_key="pcsk_5w3mtx_RDk8sBsnCC6k8W3vDWMZPf8VvdEpL9tQq6Xu6hK5gdfBCWX98PXgVDWXto7fZcw")
index = pc.Index("finance")

# DEFINING VARIABLES #
llm = ChatOpenAI(model="gpt-4o-mini")

# TRANSFORM USERS RAW QUESTION INTO STRUCTURED QUERY FOR VECTOR DB #
''' This below Search and analyze_query funciton is used when we want to structure the user query and send it to vector database for relevant retrieval. The below code is especially for the analyzing the Financial Data for Bannister. 

@@@ DELETE OR CHANGE IT IF IT IS NOT WORKING OR NOT USEFUL @@@''' 
class DateRange(BaseModel):
    start_date: Optional[str] = None  # ISO date (YYYY-MM-DD) or None
    end_date: Optional[str] = None

# Simplified Search schema - OpenAI compatible
class Search(BaseModel):
    """Structured query for financial data retrieval"""
    query_type: Literal["revenue", "expenses", "profit", "cash_flow", "balance_sheet", "custom"] = "custom"
    keywords: List[str] = Field(
        default_factory=list,
        description="Key terms to search (e.g., 'Q3 revenue', 'operating expenses')"
    )
    time_period: Optional[str] = Field(
        default=None,
        description="Time period (e.g., 'Q3 2024', 'January 2024', 'last 3 months')"
    )
    departments: List[str] = Field(
        default_factory=list,
        description="Business units/departments (e.g., 'Sales', 'Marketing', 'Operations')"
    )
    metrics: List[str] = Field(
        default_factory=list,
        description="Specific metrics (e.g., 'revenue', 'profit margin', 'cash flow')"
    )
    search_focus: Literal["summary", "detailed", "comparison", "trend"] = "summary"


class State(TypedDict):
    question: str
    query: Search
    context: List[Document]
    answer: str

question = input("Enter your question: ")

# Create initial state with the question
initial_state = {
    "question": question,  # Set question from console input
    "query": Search(),
    "context": [],
    "answer": ""
}

# --------------------------
# ANALYZE QUERY
# --------------------------
def analyze_query(state: State) -> dict:
    """
    Parse user's natural question into structured financial search query.
    Returns relevant search parameters to find matching financial sheets in Pinecone.
    """
    
    system_prompt = """You are a financial data analyst. Extract the user's intent into a structured query.
    
    Guidelines:
    - Identify what financial metric they're asking about (revenue, expenses, profit, etc.)
    - Extract time periods (months, quarters, years)
    - Identify relevant departments/business units if mentioned
    - List specific metrics they care about
    - Determine if they want summary, detailed breakdown, comparison, or trend analysis
    
    Be precise and extract only what's explicitly or clearly implied in the question."""
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("user", "{question}")
    ])
    
    # Create structured LLM
    structured_llm = llm.with_structured_output(Search)
    chain = prompt | structured_llm
    
    # Parse the question
    try:
        parsed_query = chain.invoke({"question": state["question"]})
        print(f"\n✅ Parsed Query Object: {parsed_query}")
    except Exception as e:
        print(f"❌ Error parsing query: {e}")
        raise
    
    # Ensure parsed_query is a Search object
    if not isinstance(parsed_query, Search):
        raise ValueError(f"Expected Search object, got {type(parsed_query)}")
    
    # Build search keywords for Pinecone
    search_keywords = []
    
    # Add keywords if they exist and are not empty
    if parsed_query.keywords and len(parsed_query.keywords) > 0:
        search_keywords.extend(parsed_query.keywords)
    
    # Add metrics if they exist
    if parsed_query.metrics and len(parsed_query.metrics) > 0:
        search_keywords.extend(parsed_query.metrics)
    
    # Add departments if they exist
    if parsed_query.departments and len(parsed_query.departments) > 0:
        search_keywords.extend(parsed_query.departments)
    
    # Add time period if it exists
    if parsed_query.time_period:
        search_keywords.append(parsed_query.time_period)
    
    # Fallback if no keywords extracted
    if not search_keywords:
        search_keywords = state["question"].split()[:5]
    
    # Create enhanced query object
    enhanced_query = {
        "query_type": parsed_query.query_type,
        "keywords": search_keywords[:10],  # Top 10 keywords
        "time_period": parsed_query.time_period,
        "departments": parsed_query.departments,
        "metrics": parsed_query.metrics,
        "search_focus": parsed_query.search_focus,
        "original_question": state["question"]
    }
    
    print(f"\n📊 Parsed Query:")
    print(f"  Type: {parsed_query.query_type}")
    print(f"  Keywords: {search_keywords}")
    print(f"  Time Period: {parsed_query.time_period}")
    print(f"  Focus: {parsed_query.search_focus}")
    
    return {"query": parsed_query}

# RETRIEVAL (Semantic Search & Top-K) #
def retrieve(state: State) -> dict:
    """
    Retrieve relevant financial documents from Pinecone VectorStore using the parsed query.
    Uses keywords, time_period, departments, and metrics to find matching documents.
    """
    
    query = state["query"]
    embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
    vector_store = PineconeVectorStore(embedding=embeddings, index=index)
    
    print(f"\n🔍 Retrieving documents from Pinecone VectorStore...")
    print(f"  Query Type: {query.query_type}")
    print(f"  Keywords: {query.keywords}")
    print(f"  Time Period: {query.time_period}")
    print(f"  Departments: {query.departments}")
    print(f"  Metrics: {query.metrics}")
    
    # Combine all search terms
    search_terms = query.keywords.copy() if query.keywords else []
    if query.metrics and len(query.metrics) > 0:
        search_terms.extend(query.metrics)
    if query.departments and len(query.departments) > 0:
        search_terms.extend(query.departments)
    
    search_text = " ".join(search_terms)
    
    print(f"  Combined Search Text: {search_text}")
    
    try:
        # Search using PineconeVectorStore with similarity_search
        documents = vector_store.similarity_search(
            query=search_text,
            k=10  # Retrieve top 10 results
        )
        
        print(f"\n✅ Found {len(documents)} results from Pinecone VectorStore")
        
    except Exception as e:
        print(f"❌ Error querying Pinecone VectorStore: {e}")
        raise
    
    # Filter documents by time_period if specified
    if query.time_period:
        filtered_docs = []
        for doc in documents:
            doc_time = doc.metadata.get('time_period', '').lower()
            if query.time_period.lower() in doc_time:
                filtered_docs.append(doc)
        
        # If filtering removes too many, keep original results
        if filtered_docs:
            documents = filtered_docs
            print(f"  Filtered to {len(documents)} documents by time period: {query.time_period}")
    
    # Filter documents by departments if specified
    if query.departments and len(query.departments) > 0:
        filtered_docs = []
        for doc in documents:
            doc_dept = doc.metadata.get('department', '').lower()
            if any(dept.lower() in doc_dept for dept in query.departments):
                filtered_docs.append(doc)
        
        # If filtering removes too many, keep original results
        if filtered_docs:
            documents = filtered_docs
            print(f"  Filtered to {len(documents)} documents by department: {query.departments}")
    
    # If no documents found, return empty context
    if not documents:
        print(f"\n⚠️  No documents found matching the query.")
        return {"context": []}
    
    # Limit to top 5 most relevant documents
    top_documents = documents[:5]
    
    print(f"\n📄 Retrieved {len(top_documents)} Top Documents:")
    for i, doc in enumerate(top_documents, 1):
        print(f"  {i}. File: {doc.metadata.get('file_name', 'Unknown')}")
        print(f"     Sheet: {doc.metadata.get('sheet_name', 'Unknown')}")
        print(f"     Period: {doc.metadata.get('time_period', 'Unknown')}")
        print(f"     Department: {doc.metadata.get('department', 'Unknown')}")
        print(f"     Preview: {doc.page_content[:80]}...")
        print()
    
    return {"context": top_documents}

# Re-RANKING #

# DEFINING PROMPT #
prompt = hub.pull("rlm/rag-prompt")

# PASS DATA TO LLM AND GENERATE RESPONSE #
def generate(state: State):
    docs_content = "\n\n".join(doc.page_content for doc in state["context"])
    messages = prompt.invoke({"question": state["question"], "context": docs_content})
    response = llm.invoke(messages)
    return {"answer": response.content}

# COMPILE APPLICATION / BUILD GRAPH #
graph_builder = StateGraph(State).add_sequence([analyze_query, retrieve, generate])
graph_builder.add_edge(START, "analyze_query")
graph = graph_builder.compile()

final_state = graph.invoke(initial_state)
print(final_state["answer"])


