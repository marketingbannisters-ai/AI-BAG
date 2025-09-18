import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, CheckCircle, Users, Image, Link, Hash, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import avatarSocial from "@/assets/avatar-social.jpg";

const SocialPostr = () => {
  const [workflowChecks, setWorkflowChecks] = useState<Record<string, boolean>>({});
  const [postingTemplate, setPostingTemplate] = useState({
    platform: "",
    caption: "",
    hashtags: "",
    link: "",
    imageNotes: ""
  });

  const workflowSteps = [
    { id: "client", label: "Client approval received", description: "Confirm client has approved the content" },
    { id: "copy", label: "Copy reviewed and finalized", description: "All text has been proofread and approved" },
    { id: "visuals", label: "Visual assets prepared", description: "Images, videos, or graphics are ready" },
    { id: "schedule", label: "Posting schedule confirmed", description: "Date and time have been scheduled" },
    { id: "utm", label: "UTM parameters added", description: "Tracking codes applied to all links" },
    { id: "hashtags", label: "Hashtags researched", description: "Relevant and trending hashtags selected" },
    { id: "crosspost", label: "Cross-platform strategy planned", description: "Content adapted for each platform" },
    { id: "backup", label: "Backup content prepared", description: "Alternative posts ready if needed" }
  ];

  const handleCheckboxChange = (stepId: string, checked: boolean) => {
    setWorkflowChecks(prev => ({ ...prev, [stepId]: checked }));
  };

  const handleTemplateChange = (field: string, value: string) => {
    setPostingTemplate(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = () => {
    const template = `Platform: ${postingTemplate.platform}

Caption:
${postingTemplate.caption}

Hashtags:
${postingTemplate.hashtags}

Link:
${postingTemplate.link}

Image Notes:
${postingTemplate.imageNotes}`;

    navigator.clipboard.writeText(template);
    toast({
      title: "Copied to clipboard",
      description: "Template content has been copied successfully",
    });
  };

  const completedSteps = Object.values(workflowChecks).filter(Boolean).length;
  const totalSteps = workflowSteps.length;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">SocialPostr</h1>
          <div className="flex items-center justify-center space-x-3 text-muted-foreground mb-4">
            <span>Created by</span>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={avatarSocial} alt="Social Media Team" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <Badge variant="secondary" className="bg-brand-gold2/10 text-brand-gold2">
                Social Media Team
              </Badge>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Streamlined workflow checklist and template system for consistent social media posting across all platforms.
          </p>
        </div>

        <Tabs defaultValue="workflow" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="workflow" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Workflow</span>
            </TabsTrigger>
            <TabsTrigger value="assets" className="flex items-center space-x-2">
              <Image className="h-4 w-4" />
              <span>Assets</span>
            </TabsTrigger>
            <TabsTrigger value="template" className="flex items-center space-x-2">
              <Copy className="h-4 w-4" />
              <span>Template</span>
            </TabsTrigger>
            <TabsTrigger value="qa" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>QA</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="space-y-6">
            <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Pre-Post Checklist</h2>
                <div className="flex items-center space-x-3">
                  <span className="text-muted-foreground">
                    {completedSteps} of {totalSteps} completed
                  </span>
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className="bg-brand-blue1 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {workflowSteps.map((step) => (
                  <div key={step.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <Checkbox
                      id={step.id}
                      checked={workflowChecks[step.id] || false}
                      onCheckedChange={(checked) => handleCheckboxChange(step.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor={step.id}
                        className="text-base font-medium text-foreground cursor-pointer block"
                      >
                        {step.label}
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assets" className="space-y-6">
            <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Asset Requirements</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Image className="mr-2 h-5 w-5 text-brand-blue1" />
                    Visual Assets
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• High-resolution images (1080x1080 for Instagram)</li>
                    <li>• Platform-specific dimensions</li>
                    <li>• Brand-compliant visuals</li>
                    <li>• Alternative text for accessibility</li>
                    <li>• Video files under platform limits</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Link className="mr-2 h-5 w-5 text-brand-blue2" />
                    Link Assets
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• UTM-tagged URLs</li>
                    <li>• Shortened links (bit.ly, etc.)</li>
                    <li>• Landing page preview cards</li>
                    <li>• Backup destination URLs</li>
                    <li>• Click tracking enabled</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="template" className="space-y-6">
            <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Posting Template</h2>
                <Button onClick={copyToClipboard} variant="brand" size="sm">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Template
                </Button>
              </div>

              <div className="grid gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Platform
                  </label>
                  <Input
                    placeholder="e.g., Instagram, LinkedIn, Twitter"
                    value={postingTemplate.platform}
                    onChange={(e) => handleTemplateChange("platform", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Caption
                  </label>
                  <Textarea
                    placeholder="Write your social media caption here..."
                    rows={4}
                    value={postingTemplate.caption}
                    onChange={(e) => handleTemplateChange("caption", e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block flex items-center">
                      <Hash className="mr-1 h-4 w-4" />
                      Hashtags
                    </label>
                    <Textarea
                      placeholder="#hashtag1 #hashtag2 #hashtag3"
                      rows={3}
                      value={postingTemplate.hashtags}
                      onChange={(e) => handleTemplateChange("hashtags", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block flex items-center">
                      <Link className="mr-1 h-4 w-4" />
                      Link
                    </label>
                    <Input
                      placeholder="https://example.com?utm_source=social"
                      value={postingTemplate.link}
                      onChange={(e) => handleTemplateChange("link", e.target.value)}
                    />
                    <Textarea
                      placeholder="Image description and notes..."
                      rows={2}
                      className="mt-2"
                      value={postingTemplate.imageNotes}
                      onChange={(e) => handleTemplateChange("imageNotes", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qa" className="space-y-6">
            <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Quality Assurance</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Final Review Checklist</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-gold1" />
                      <span>Spelling and grammar checked</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-gold1" />
                      <span>Brand voice and tone consistent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-gold1" />
                      <span>Links tested and working</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-gold1" />
                      <span>Hashtags researched and relevant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-gold1" />
                      <span>Visual assets optimized for platform</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Approval Process</h3>
                  <p className="text-muted-foreground mb-4">
                    Ensure all posts go through the proper approval chain before publishing:
                  </p>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">
                      Content Creator → Team Lead → Client/Manager → Scheduled for Publishing
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SocialPostr;