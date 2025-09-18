import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Download, Settings, AlertCircle, HelpCircle, Mail, Code } from "lucide-react";
import avatarAutomation from "@/assets/avatar-automation.jpg";

const EmailGenius = () => {
  const [sidebarActive, setSidebarActive] = useState("install");

  const quickLinks = [
    { id: "install", label: "Install", icon: Download },
    { id: "permissions", label: "Permissions", icon: Settings },
    { id: "troubleshooting", label: "Troubleshooting", icon: AlertCircle },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Email Genius</h1>
          <div className="flex items-center justify-center space-x-3 text-muted-foreground mb-4">
            <span>Created by</span>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={avatarAutomation} alt="Automation Team" />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <Badge variant="secondary" className="bg-brand-gold1/10 text-brand-gold1">
                Automation Team
              </Badge>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            An intelligent Outlook add-in that enhances your email workflow with AI-powered features and automation capabilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-blue1 rounded-lg flex items-center justify-center">
                      <Download className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">1. Get the Manifest</h3>
                      <p className="text-sm text-muted-foreground">Download the Email Genius manifest file</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Download the manifest.xml file to begin the installation process. This file contains all the necessary configuration for the Email Genius add-in.
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <code className="text-sm text-brand-navy">
                        https://automation-hub.com/downloads/email-genius-manifest.xml
                      </code>
                    </div>
                    <Button variant="brand" className="w-full sm:w-auto">
                      <Download className="mr-2 h-4 w-4" />
                      Download Manifest
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-blue2 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">2. Install in Outlook</h3>
                      <p className="text-sm text-muted-foreground">Add the manifest to your Outlook installation</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Follow these steps to install Email Genius in your Outlook application:</p>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Open Microsoft Outlook</li>
                      <li>Navigate to <strong>Insert → Get Add-ins</strong></li>
                      <li>Click on <strong>My add-ins</strong> in the left sidebar</li>
                      <li>Select <strong>Add a custom add-in → Add from file</strong></li>
                      <li>Browse and select the downloaded manifest.xml file</li>
                      <li>Click <strong>Install</strong> when prompted</li>
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-gold1 rounded-lg flex items-center justify-center">
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">3. Trust Prompts</h3>
                      <p className="text-sm text-muted-foreground">Approve necessary permissions</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      When installing, Outlook will display security prompts. Click <strong>"Yes"</strong> or <strong>"Allow"</strong> for:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Reading and writing email content</li>
                      <li>Accessing external web services</li>
                      <li>Storing user preferences</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-gold2 rounded-lg flex items-center justify-center">
                      <Code className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">4. Connect Webhook</h3>
                      <p className="text-sm text-muted-foreground">Configure n8n integration</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      To enable full functionality, connect your n8n webhook URL:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Open Email Genius task pane in Outlook</li>
                      <li>Navigate to Settings</li>
                      <li>Paste your n8n webhook URL</li>
                      <li>Click Save Configuration</li>
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Troubleshooting Section */}
            <div className="mt-12 bg-card rounded-2xl shadow-soft border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <AlertCircle className="mr-3 h-6 w-6 text-brand-gold2" />
                Troubleshooting
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Manifest validation errors</h3>
                  <p className="text-muted-foreground">Confirm GUID, icons, and version numbers are correct in the manifest.xml file.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Ribbon button not visible</h3>
                  <p className="text-muted-foreground">Check that Outlook surface (read/compose) matches the manifest configuration and add-in is properly sideloaded.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Network requests blocked</h3>
                  <p className="text-muted-foreground">Verify that the n8n webhook URL is reachable from your network and firewall settings allow connections.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-2xl shadow-soft border border-border p-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
              <nav className="space-y-2">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      className="flex items-center space-x-3 px-3 py-2 text-muted-foreground hover:text-brand-blue1 hover:bg-brand-blue1/5 rounded-lg transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{link.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailGenius;