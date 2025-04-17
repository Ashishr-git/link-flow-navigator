
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle, XCircle, MessageCircle, Filter } from "lucide-react";
import { mockLinks } from "@/lib/mock-data";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ReviewQueue = () => {
  const [links, setLinks] = useState(mockLinks.filter((link) => link.status === "pending"));
  const [activeTab, setActiveTab] = useState("managerReview");
  const [feedback, setFeedback] = useState("");
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | null>(null);
  
  const handleOpenDialog = (linkId: string, action: "approve" | "reject") => {
    setSelectedLink(linkId);
    setReviewAction(action);
    setDialogOpen(true);
  };
  
  const handleReview = () => {
    if (!selectedLink || !reviewAction) return;
    
    setLinks((prevLinks) =>
      prevLinks.filter((link) => link.id !== selectedLink)
    );
    
    const actionText = reviewAction === "approve" ? "approved" : "rejected";
    toast({
      title: `Link ${actionText}`,
      description: feedback ? `Feedback: ${feedback}` : `The link has been ${actionText}.`,
    });
    
    setDialogOpen(false);
    setFeedback("");
    setSelectedLink(null);
    setReviewAction(null);
  };
  
  const getFilteredLinks = () => {
    if (activeTab === "managerReview") {
      return links.filter((_, index) => index < 3); // Mock: First few links for manager review
    } else {
      return links.filter((_, index) => index >= 3); // Mock: Rest for core team
    }
  };
  
  const filteredLinks = getFilteredLinks();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Review Queue</h1>
        <p className="text-gray-600">Approve or reject submitted navigation links</p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                Pending Reviews
              </CardTitle>
              <CardDescription>
                Links waiting for your review and feedback
              </CardDescription>
            </div>
            <Button variant="outline" className="flex items-center self-start">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="managerReview" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="managerReview">
                Manager Review <Badge className="ml-2 bg-blue-100 text-blue-800">{links.filter((_, index) => index < 3).length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="coreTeamReview">
                Core Team Review <Badge className="ml-2 bg-purple-100 text-purple-800">{links.filter((_, index) => index >= 3).length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {filteredLinks.length > 0 ? (
                <div className="space-y-6">
                  {filteredLinks.map((link) => (
                    <Card key={link.id} className="overflow-hidden">
                      <div className="bg-gray-50 p-4 border-b">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                          <div>
                            <h3 className="font-semibold">
                              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                                {link.url.replace(/^https?:\/\//, '').split('/')[0]}
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            </h3>
                            <p className="text-xs text-gray-500">
                              Submitted by {link.createdBy} • Product: {link.product}
                              {link.subproduct && ` / ${link.subproduct}`}
                            </p>
                          </div>
                          <Badge className="self-start">{link.platform}</Badge>
                        </div>
                      </div>
                      
                      <CardContent className="py-4">
                        <p className="text-sm mb-3">{link.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {link.keywords.map((keyword, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex justify-end gap-2 bg-gray-50 border-t py-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600" 
                          onClick={() => handleOpenDialog(link.id, "reject")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700" 
                          onClick={() => handleOpenDialog(link.id, "approve")}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No links pending for review.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {reviewAction === "approve" ? "Approve Link" : "Reject Link"}
            </DialogTitle>
            <DialogDescription>
              {reviewAction === "approve"
                ? "Are you sure you want to approve this link? You can add optional feedback."
                : "Please provide feedback explaining why this link is being rejected."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-2">
            <label className="text-sm font-medium block mb-1">Feedback {reviewAction === "reject" && "(required)"}</label>
            <Textarea
              placeholder={reviewAction === "approve" ? "Optional feedback" : "Explain why this link is being rejected..."}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleReview}
              disabled={reviewAction === "reject" && !feedback}
              variant={reviewAction === "approve" ? "default" : "destructive"}
            >
              {reviewAction === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewQueue;
