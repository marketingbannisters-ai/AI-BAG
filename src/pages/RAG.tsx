import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import FileUpload from "@/components/FileUpload";
import { MessageSquare, Upload } from "lucide-react";

const RAG = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "upload">("chat");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto h-screen flex flex-col p-4 md:p-6">
        {/* Header with Tab Switcher */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex rounded-2xl bg-card border border-border p-1 shadow-card">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "chat"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "upload"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Upload className="h-4 w-4" />
              Upload
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-card rounded-3xl border border-border shadow-elevated overflow-hidden">
          {activeTab === "chat" ? <ChatInterface /> : <FileUpload />}
        </div>
      </div>
    </div>
  );
};

export default RAG;
