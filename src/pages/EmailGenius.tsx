import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Download, Settings, AlertCircle, HelpCircle, Mail, Code, Users, Clock, DollarSign, Target, Timer } from "lucide-react";
import avatarAutomation from "@/assets/avatar-automation.jpg";

const EmailGenius = () => {
  const [sidebarActive, setSidebarActive] = useState("install");

  const quickLinks = [
    { id: "install", label: "Install", icon: Download },
    /* {  id: "permissions", label: "Permissions", icon: Settings  }, */
    { id: "troubleshooting", label: "Troubleshooting", icon: AlertCircle },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

    const url = "https://raw.githubusercontent.com/marketingbannisters-ai/email-genius/refs/heads/main/manifest.xml";

  const downloadFile = async () => {
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();

      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "manifest.xml"; // you control the filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Sorry, the download failed. Please try again.");
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Email Genius</h1>
          <div className="flex items-center justify-center space-x-3 text-muted-foreground mb-4">
            <span>Contributed By</span>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567456/varun-profile-pic_sh12zt.jpg" alt="Automation Team" />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <Badge variant="secondary" className="bg-brand-gold1/10 text-brand-gold1">
                Varun Teja
              </Badge>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            An intelligent Outlook add-in that enhances your email workflow with AI-powered features and automation capabilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-4">
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
                        <a href = "https://raw.githubusercontent.com/marketingbannisters-ai/email-genius/refs/heads/main/manifest.xml" target="_blank" download = "manifest.xml">https://raw.githubusercontent.com/marketingbannisters-ai/email-genius/refs/heads/main/manifest.xml</a>
                      </code>
                    </div>
                    <Button variant="brand" className="w-full sm:w-auto" onClick={downloadFile}>
                      <Download className="mr-2 h-4 w-4" />Download Manifest.xml
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
                      <p className="text-sm text-muted-foreground">Add the manifest to your Outlook Add-in installation</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Follow these steps to install Email Genius in your Outlook application:</p>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Close Outlook desktop app before starting.</li>
                      <li>Go to <b><a href = "https://aka.ms/olksideload" target="_blank">https://aka.ms/olksideload</a></b></li>
                      <li>Navigate to <strong>My Add-ins → Custom Add-ins.</strong></li>
                      <li>Click <strong>Add a custom add-in → Add From File.</strong></li>
                      <li>Browse and select the downloaded manifest.xml file</li>
                      <li>Click <strong>Install</strong> when prompted</li>
                      <li>Open the Outlook Desktop App. The add-in should now appear.</li>
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
                      <h3 className="text-lg font-semibold">3. Customize the toolbar</h3>
                      <p className="text-sm text-muted-foreground">Make Email Genius Easy to Reach</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                    Customize your Outlook toolbar to keep Email Genius within easy reach.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Open the Outlook Desktop App.</li>
                      <li>Click on the three dots (…) in the toolbar.</li>
                      <li>Find Email Genius in the Installed Add-ins list on the right side of the app.</li>
                      <li>Drag Email Genius to your desired position at the top of the toolbar.
                        ✅Tip: Place it in the first position for the quickest access while working with emails.
                      </li>
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
                      <h3 className="text-lg font-semibold">4. How to use Email Genius?</h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Open any email in Outlook that you’d like to reply to. </li>
                      <li>Click on <b>Email Genius.</b> A frame will open on the right side.</li>
                      <li>In the input box, type your <b>intent</b> (This is the direction or tone you want your reply to take.)</li>
                      <li>Wait about <b>5 seconds</b> while Email Genius creates your draft.</li>
                      <li>Review the suggested email draft, and make any edits you’d like before sending.</li>
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
                  <h3 className="font-semibold text-foreground mb-2">Add-in Not Appearing</h3>
                  <p className="text-muted-foreground">
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Ensure Outlook is fully closed before installing the add-in.</li>
                      <li>Check under the three dots (…) menu in the navigation bar.</li>
                    </ul>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Installation Failed / Error During Upload</h3>
                  <p className="text-muted-foreground">
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Confirm you’re connected to the internet.</li>
                      <li>Ensure you’re using the right link: <a href="https://aka.ms/olksideload" className="text-brand-blue1 hover:underline" target="_blank">https://aka.ms/olksideload</a>, which will navigate to web Outlook app.</li>
                    </ul></p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Facing error while installing manifest file</h3>
                  <p className="text-muted-foreground">
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Verify that the correct manifest.xml file was uploaded.</li>
                      <li>If you are still facing issues, mail to <strong>sean.mcmahon@bannsiters.com</strong>.</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>

            {/* Why to use this tool Section */}
            <div id="why-use" className="mt-12 bg-card rounded-2xl shadow-soft border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Target className="mr-3 h-6 w-6 text-brand-blue1" />
                Why to use this tool?
              </h2>
              
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg">
                  At Bannister, the numbers tell a compelling story about email efficiency:
                </p>
                
                {/* Statistics Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-brand-blue1/10 to-brand-blue2/10 rounded-xl p-4 border border-brand-blue1/20">
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="h-8 w-8 text-brand-blue1" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">1000+</div>
                        <div className="text-sm text-muted-foreground">Employees</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-brand-gold1/10 to-brand-gold2/10 rounded-xl p-4 border border-brand-gold1/20">
                    <div className="flex items-center space-x-3 mb-2">
                      <Mail className="h-8 w-8 text-brand-gold1" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">10</div>
                        <div className="text-sm text-muted-foreground">Considering responding to emails per day</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-brand-navy/10 to-brand-blue1/10 rounded-xl p-4 border border-brand-navy/20">
                    <div className="flex items-center space-x-3 mb-2">
                      <Clock className="h-8 w-8 text-brand-navy" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">3</div>
                        <div className="text-sm text-muted-foreground">Consider minutes per email</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
                    <div className="flex items-center space-x-3 mb-2">
                      <Timer className="h-8 w-8 text-red-500" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">30</div>
                        <div className="text-sm text-muted-foreground">Minutes per person/day</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* The Math Breakdown */}
                <div className="bg-muted/50 rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">The Impact:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Total time per month (1000 employees):</span>
                      <span className="font-bold text-foreground text-lg">132,000 Hours</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground">Equivalent to hiring:</span>
                      <span className="font-bold text-brand-blue1 text-lg">62 Full-time Employees</span>
                    </div>
                  </div>
                </div>
                
                {/* Goal Statement */}
                <div className="bg-gradient-to-r from-brand-blue1/5 to-brand-blue2/5 rounded-xl p-6 border border-brand-blue1/20">
                  <div className="flex items-start space-x-4">
                    <Target className="h-8 w-8 text-brand-blue1 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Goal of this tool</h3>
                      <p className="text-muted-foreground text-lg">
                        <strong>Bring down the amount spent on emails as much as possible.</strong> Every minute saved on email processing translates to more time for productive work and significant cost savings across the organization.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
</div>
          {/* Sticky Sidebar 
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
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default EmailGenius;