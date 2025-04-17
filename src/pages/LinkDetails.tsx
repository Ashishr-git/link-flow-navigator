
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLinks } from "@/lib/mock-data";
import { NavLink } from "@/types/types";
import { ArrowLeft, ExternalLink, Clock, CheckCircle, AlertCircle, BarChart4, History, MessageCircle, Edit, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const LinkDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [link, setLink] = useState<NavLink | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundLink = mockLinks.find((l) => l.id === id);
      setLink(foundLink || null);
      setIsLoading(false);
      
      if (!foundLink) {
        toast({
          title: "Link not found",
          description: "The requested link could not be found",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    }, 500);
  }, [id, navigate]);
  
  const handleDelete = () => {
    toast({
      title: "Link deleted",
      description: "The link has been successfully deleted",
    });
    navigate("/dashboard");
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading link details...</p>
        </div>
      </div>
    );
  }
  
  if (!link) {
    return null; // We'll redirect from the useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{link.url.replace(/^https?:\/\//, '').split('/')[0]}</h1>
                  <Badge className={
                    link.status === 'approved' ? 'bg-green-100 text-green-800' :
                    link.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                  </Badge>
                </div>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline text-sm flex items-center"
                >
                  {link.url} <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
              
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex items-center text-red-600" onClick={handleDelete}>
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="info">
                <TabsList className="mb-6">
                  <TabsTrigger value="info" className="flex items-center">
                    <InfoIcon className="mr-1 h-4 w-4" />
                    Information
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center">
                    <BarChart4 className="mr-1 h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center">
                    <History className="mr-1 h-4 w-4" />
                    History
                  </TabsTrigger>
                  <TabsTrigger value="workflow" className="flex items-center">
                    <MessageCircle className="mr-1 h-4 w-4" />
                    Workflow
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="info">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-700">{link.description}</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 mb-1">Platform</h3>
                        <p>{link.platform}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 mb-1">Product</h3>
                        <p>{link.product} {link.subproduct && <span className="text-gray-500">/ {link.subproduct}</span>}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 mb-1">Created By</h3>
                        <p>{link.createdBy}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 mb-1">Keywords</h3>
                        <div className="flex flex-wrap gap-1">
                          {link.keywords.map((keyword, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-sm font-medium text-gray-500">Total Clicks</p>
                          <h3 className="text-2xl font-bold">{link.clickCount}</h3>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-sm font-medium text-gray-500">Upvotes</p>
                          <h3 className="text-2xl font-bold">{link.upvotes}</h3>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-sm font-medium text-gray-500">Downvotes</p>
                          <h3 className="text-2xl font-bold">{link.downvotes}</h3>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Click History</h3>
                      <div className="h-64 bg-gray-50 flex items-center justify-center rounded-lg border">
                        <p className="text-gray-500">Analytics chart will be displayed here</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  <div className="text-center py-10">
                    <p className="text-gray-500">No version history available for this link.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="workflow">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-2">Approval Workflow</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mt-1">
                          {link.status === "approved" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : link.status === "pending" ? (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium">Manager Review</h4>
                          <p className="text-sm text-gray-500">
                            {link.status === "approved"
                              ? "Approved by John Smith on April 15, 2025"
                              : link.status === "pending"
                              ? "Pending review since April 10, 2025"
                              : "Rejected by John Smith on April 15, 2025"}
                          </p>
                          {link.status === "rejected" && (
                            <div className="mt-2 text-sm bg-gray-50 p-3 rounded border">
                              <p className="italic">
                                "Please provide more context about the purpose of this link and how
                                it relates to our product ecosystem."
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {link.status === "approved" && (
                        <div className="flex items-start">
                          <div className="mt-1">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium">Core Team Review</h4>
                            <p className="text-sm text-gray-500">
                              Approved by Core Team on April 16, 2025
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  {link.status === "approved" ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : link.status === "pending" ? (
                    <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  <span className="font-medium">
                    {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                  </span>
                </div>
                
                <Separator className="my-2" />
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Submitted</p>
                  <p className="text-sm">April 10, 2025</p>
                </div>
                
                {link.status === "approved" && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Approved</p>
                    <p className="text-sm">April 16, 2025</p>
                  </div>
                )}
                
                {link.status === "rejected" && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Rejected</p>
                    <p className="text-sm">April 15, 2025</p>
                  </div>
                )}
                
                <Separator className="my-2" />
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Created By</p>
                  <p className="text-sm">{link.createdBy}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Custom Info icon to match Lucide style
const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
};

export default LinkDetails;
