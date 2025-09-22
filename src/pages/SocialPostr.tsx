import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  Image, 
  Upload, 
  Target, 
  Clock, 
  Mail, 
  CheckCircle, 
  AlertTriangle,
  FileImage,
  Video,
  Smartphone,
  Zap,
  Link2,
  Shield
} from "lucide-react";
import avatarSocial from "@/assets/avatar-social.jpg";

const SocialPostr = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            SocialPostr
          </h1>
          <div className="flex items-center justify-center space-x-3 text-muted-foreground mb-6">
            <span>Created by</span>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567456/varun-profile-pic_sh12zt.jpg" alt="Varun Teja" />
                <AvatarFallback>VT</AvatarFallback>
              </Avatar>
              <Badge variant="secondary" className="bg-brand-gold2/10 text-brand-gold2">
                Varun Teja
              </Badge>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            One Tool to Schedule Social Media Posts Across All Dealerships
          </p>
        </div>

        {/* Why This Tool is Special */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Why This Tool is Special</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-brand-blue1/20 hover:border-brand-blue1/40 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-blue1 to-brand-blue2 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Single Access Point</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Manage and schedule posts for every dealership from one link.
                </p>
              </CardContent>
            </Card>

            <Card className="border-brand-blue2/20 hover:border-brand-blue2/40 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-blue2 to-brand-gold1 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Post Once, Publish Everywhere</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  If a SM campaign is common across all dealerships, publish it in just 3 minutes with one submission.
                </p>
              </CardContent>
            </Card>

            <Card className="border-brand-gold1/20 hover:border-brand-gold1/40 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-gold1 to-brand-gold2 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Flexible Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Set different times for each dealership so posts go live when they're most effective.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Access */}
        <div className="mb-16">
          <Card className="border-amber-500/20 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">How to Access</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-foreground font-medium">
                  This tool is sensitive and access is restricted to approved users.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-brand-blue1 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  To request access, email <span className="font-semibold text-brand-blue1">sean.mcmahon@bannisters.com</span>. Once assessed, Sean will share the direct link with you.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How to Use */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">How to Use</h2>
          <div className="grid gap-6">
            {[
              {
                step: 1,
                title: "Choose Post Type",
                description: "Story, image, video, or other formats.",
                imageUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567485/Screenshot_2025-09-22_at_11.55.28_AM_dei3lk.png",
                icon: FileImage,
                color: "brand-blue1"
              },
              {
                step: 2,
                title: "Select Platforms",
                description: "Post to one or multiple platforms at once.",
                imageUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567485/Screenshot_2025-09-22_at_11.55.45_AM_iwcndr.png",
                icon: Smartphone,
                color: "brand-blue2"
              },
              {
                step: 3,
                title: "Upload Creatives & Caption",
                description: "Add your images, carousel or videos along with the caption.",
                imageUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567485/Screenshot_2025-09-22_at_11.55.57_AM_iexd7i.png",
                icon: Upload,
                color: "brand-gold1"
              },
              {
                step: 4,
                title: "Pick Dealerships",
                description: "Post to one or many dealerships with a single action.",
                imageUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567486/Screenshot_2025-09-22_at_11.56.35_AM_f1vilt.png",
                icon: Users,
                color: "brand-blue2"
              },
              {
                step: 5,
                title: "Set Date & Time",
                description: "Choose when your post should go live. If you select the current or a past time, it will publish immediately.",
                imageUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567486/Screenshot_2025-09-22_at_11.56.45_AM_acvcf0.png",
                icon: Calendar,
                color: "brand-blue1"
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 bg-gradient-to-br from-${item.color} to-${item.color}/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-white font-bold text-lg">{item.step}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 mr-4">
                            <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <IconComponent className={`h-8 w-8 text-${item.color}`} />
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="w-4/5 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                            <div className="text-center">
                              <div className="p-6 border-b border-white/10">
                                  <img 
                                    src={item.imageUrl}
                                    alt="SocialPostr Workflow Screenshots"
                                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto"
                                  />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Important Instructions */}
        <div className="mb-16">
          <Card className="border-red-500/20 bg-gradient-to-r from-red-50/50 to-pink-50/50 dark:from-red-950/20 dark:to-pink-950/20">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Important Instructions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">
                    Upload creatives that meet Facebook's content guidelines, otherwise your post may be rejected.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">
                    For carousel posts, number your files as: <code className="bg-muted px-2 py-1 rounded text-sm font-mono">1.png, 2.jpg, 3.png, etc.</code> (File extension doesn't matter). This ensures the correct display order.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">
                    Choosing a past time will be treated as "Post Now."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SocialPostr;