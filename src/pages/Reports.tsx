import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink } from "lucide-react";
import { reports } from "@/data/reports";
import { cn } from "@/lib/utils";

const Reports = () => {
  const [activeTab, setActiveTab] = useState<"primary" | "secondary">("primary");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = reports.filter(report => {
    const matchesTab = report.tier === activeTab;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Reports Dashboard</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access all your business intelligence reports and analytics dashboards in one place
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab("primary")}
              className={cn(
                "px-6 py-3 rounded-md text-sm font-medium transition-all",
                activeTab === "primary"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Primary Reports
            </button>
            <button
              onClick={() => setActiveTab("secondary")}
              className={cn(
                "px-6 py-3 rounded-md text-sm font-medium transition-all",
                activeTab === "secondary"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Secondary Reports
            </button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={report.imageUrl}
                  alt={report.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-brand-blue1 transition-colors">
                    {report.title}
                  </h3>
                  {report.badge && (
                    <Badge variant="secondary" className="bg-brand-blue1/10 text-brand-blue1">
                      {report.badge}
                    </Badge>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {report.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={report.author.avatarUrl}
                      alt={report.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-muted-foreground">
                      {report.author.name}
                    </span>
                  </div>
                  
                  <Button
                    asChild
                    variant="brand"
                    size="sm"
                    className="hover:scale-105 transition-transform"
                  >
                    <a
                      href={report.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Report
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No reports found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse a different category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;