import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Palette, ExternalLink, Maximize2 } from "lucide-react";
import avatarDesign from "@/assets/avatar-design.jpg";

const Designer = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center">
            <Palette className="mr-3 h-8 w-8 text-brand-blue1" />
            Designer
          </h1>
          <div className="flex items-center justify-center space-x-3 text-muted-foreground mb-4">
            <span>Created by</span>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567456/varun-profile-pic_sh12zt.jpg" alt="Design Team" />
                <AvatarFallback>DT</AvatarFallback>
              </Avatar>
              <Badge variant="secondary" className="bg-brand-blue1/10 text-brand-blue1">
                Design Team
              </Badge>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center">
            Under Construction. Comming Soon!
          </h2>
          {/* Uncomment below section when consturction is over
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
           Under Construction. Comming Soon!
          </p>
          */}
        </div>

        <div className="bg-card rounded-2xl shadow-soft border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Design Interface</h2>
            <div className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Interactive Tool</span>
            </div>
          </div>
          
          <div className="relative">
            <iframe
              src="https://bannister.app.n8n.cloud/webhook/28477095-1202-42c9-b797-c944160b451b/chat"
              className="w-full aspect-[3/2] md:aspect-[16/9] rounded-2xl shadow-soft border border-border"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              allow="clipboard-write; microphone; camera"
              referrerPolicy="no-referrer"
              title="Designer Tool"
            />
            
            {/* Fullscreen Overlay */}
            <div className="absolute top-4 right-4">
              <button className="bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-sm hover:bg-background transition-colors">
                <Maximize2 className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Grid 
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
            <div className="w-12 h-12 bg-brand-blue1 rounded-lg flex items-center justify-center mb-4">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">AI-Powered Design</h3>
            <p className="text-muted-foreground">
              Generate professional designs using AI with natural language prompts and automatic brand consistency.
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
            <div className="w-12 h-12 bg-brand-blue2 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21,15 16,10 5,21"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Template Library</h3>
            <p className="text-muted-foreground">
              Access hundreds of pre-designed templates optimized for different platforms and use cases.
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
            <div className="w-12 h-12 bg-brand-gold2 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Brand Compliance</h3>
            <p className="text-muted-foreground">
              Automatically enforce brand guidelines including colors, fonts, logos, and styling standards.
            </p>
          </div>
        </div>
*/}
        {/* Usage Instructions 
        <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">How to Use Designer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Getting Started</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>1. Click in the design interface above</li>
                <li>2. Describe what you want to create</li>
                <li>3. Choose from generated options</li>
                <li>4. Customize colors, text, and layout</li>
                <li>5. Download in your preferred format</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Pro Tips</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Be specific about dimensions and platform</li>
                <li>• Mention brand colors or style preferences</li>
                <li>• Use "make it more..." for quick iterations</li>
                <li>• Save frequently used designs as templates</li>
                <li>• Export in multiple formats for flexibility</li>
              </ul>
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default Designer;