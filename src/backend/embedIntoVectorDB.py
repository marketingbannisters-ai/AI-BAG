# IMPORTING PACKAGES #
import warnings
from langchain_core.utils.env import env_var_is_set
# Suppress LangChainDeprecationWarning
warnings.filterwarnings("ignore", message=".*pydantic.*")

import os
from typing import TypedDict, Any
from datetime import datetime
import re
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_google_community import GCSFileLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone
from langchain_core.documents import Document
from langgraph.graph import START, StateGraph

# CONNECTIONS / SETTING ENVIRONMENT VARIABLES #
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_API_KEY"] = "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"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "F:\Bannister\RAG\bannister-474817-09feaf178f93.json"
if not os.environ.get("OPENAI_API_KEY"):
  os.environ["OPENAI_API_KEY"] = "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"
pc = Pinecone(api_key="pcsk_5w3mtx_RDk8sBsnCC6k8W3vDWMZPf8VvdEpL9tQq6Xu6hK5gdfBCWX98PXgVDWXto7fZcw")
index = pc.Index("finance")

class State(TypedDict):
    project_name: str
    bucket: str
    blob: str
    filename: str
    docs: list[Document]
    all_splits: list[Document]
    vector_store: Any
    upserted_count: int

# LOADER / DOCUMENTS LOADER #
def document_loader(state: State) -> dict[str, Any]:
    print("###Loader START###")
    loader = GCSFileLoader(
        project_name = state["project_name"],
        bucket = state["bucket"],
        blob = state["blob"],
    )
    docs = loader.load()
    return {"docs": docs}

# TEXT SPLITTER / CHUNKS #` `
def text_splitter(state: State) -> dict[str, Any]:
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=250, chunk_overlap=20)
    all_splits = text_splitter.split_documents(state["docs"])
    return {"all_splits": all_splits}

# === METADATA ENRICHMENT === #
def extract_metadata_from_filename(filename: str):
    match = re.search(r"(\w+)\s*-\s*([A-Za-z]+)\s*(\d+)", filename)
    if match:
        company = match.group(1)
        month = match.group(2)
        year = "20" + match.group(3)
    else:
        company, month, year = "Unknown", "Unknown", "Unknown"
    return company, month, year


def enrich_metadata(state: State) -> dict[str, Any]:
    fileName = state["filename"]
    company, month, year = extract_metadata_from_filename(fileName)
    now_iso = datetime.now().isoformat()
    enriched: list[Document] = []

    for doc in state["all_splits"]:
        md: dict[str, Any] = dict(doc.metadata or {})
        md.update({
            "company": "Bannister",
            "document_type": "Composite Financial Sheet",
            "month": month,
            "year": year,
            "source_bucket": state.get("bucket", "fiance_bannsiter"),
            "source_path": state.get("blob", "AI Composite/Composite Gbf Co - Aug 25.XLS"),
            "uploaded_at": now_iso,
            "processed_by": "RAG-Finance-Pipeline",
        })
        enriched.append(Document(page_content=doc.page_content, metadata=md))
    print(enriched)
    return {"all_splits": enriched}

# EMBEDDINGS #
def embedding_doc(state: State) -> dict[str, Any]:
    print("###EMBED START###")
    embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
    print("###EMBED MIDDLE###")
    vector_store = PineconeVectorStore(embedding=embeddings, index=index)
    print("###EMBED END###")
    return {"vector_store": vector_store}

# INSERT INTO VECTOR DATABASE #
def insert_data_into_vector_db(state: State) -> dict[str, Any]:
    store_doc_in_vector_db = state['vector_store'].add_documents(documents=state['all_splits'])
    return {"upserted_count": len(store_doc_in_vector_db)}

# COMPILE APPLICATION / BUILD GRAPH #
graph_builder = StateGraph(State).add_sequence([document_loader, text_splitter, enrich_metadata, embedding_doc, insert_data_into_vector_db])
graph_builder.add_edge(START, "document_loader")
graph = graph_builder.compile()

initial_state: dict[str, Any] = { "project_name": "bannister-474817", "bucket": "finance_bannsiter", "blob": "AI Composite/Composite Gbf Co - Aug 25.XLS", "filename": "Composite Gbf Co - Aug 25.XLS", }

