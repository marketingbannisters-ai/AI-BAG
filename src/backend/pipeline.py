from pprint import pprint
from embedIntoVectorDB import initial_state, graph

if __name__ == "__main__":
    print("\n=== STREAM START ===")
    for event in graph.stream(initial_state, stream_mode="values"):  # or "updates"
        # event is a dict {node_name: partial_state_update}
        for node, payload in event.items():
            print(f"\n--- {node} ---")
            # Show only the keys this node returned to keep logs readable
            pprint(payload)
    print("\n=== STREAM DONE ===")