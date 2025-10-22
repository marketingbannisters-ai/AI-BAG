import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "@/auth/AuthContext";

createRoot(document.getElementById("root")!).render(
<BrowserRouter basename={import.meta.env.BASE_URL}>
  <AuthProvider> {/* <--- wraps the whole app */}
        <App />
      </AuthProvider>
</BrowserRouter>
);
