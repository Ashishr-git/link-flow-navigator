
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, CheckCircle, Clock, AlertCircle, LinkIcon, PieChart, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockLinks } from "@/lib/mock-data";
import { NavLink } from "@/types/types";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const myLinks = [...mockLinks];
  
  // Statistics
  const totalLinks = myLinks.length;
  const approvedLinks = myLinks.filter(link => link.status === "approved").length;
  const pendingLinks = myLinks.filter(link => link.status === "pending").length;
  const rejectedLinks = myLinks.filter(link => link.status === "rejected").length;
  
  // Filter links based on active tab
  const getFilteredLinks = (): NavLink[] => {
    if (activeTab === "approved") {
      return myLinks.filter(link => link.status === "approved");
    } else if (activeTab === "pending") {
      return myLinks.filter(link => link.status === "pending");
    } else if (activeTab === "rejected") {
      return myLinks.filter(link => link.status === "rejected");
    }
    return myLinks;
  };
  
  const filteredLinks = getFilteredLinks();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Dashboard</h1>
          <p className="text-gray-600">Manage and track your submitted links</p>
        </div>
        <Button onClick={() => navigate("/submit")} className="self-start">
          Submit New Link
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Links</p>
                <h3 className="text-3xl font-bold">{totalLinks}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <LinkIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Approval Rate</p>
                <h3 className="text-3xl font-bold">{totalLinks ? Math.round((approvedLinks / totalLinks) * 100) : 0}%</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <PieChart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Clicks</p>
                <h3 className="text-3xl font-bold">{myLinks.reduce((sum, link) => sum + link.clickCount, 0)}</h3>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-blue-600" />
            Link Activity
          </CardTitle>
          <CardDescription>
            Analytics and status of your submitted links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="approved">
                Approved <Badge className="ml-2 bg-green-100 text-green-800">{approvedLinks}</Badge>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending <Badge className="ml-2 bg-yellow-100 text-yellow-800">{pendingLinks}</Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected <Badge className="ml-2 bg-red-100 text-red-800">{rejectedLinks}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {filteredLinks.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">URL</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Clicks</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLinks.map((link) => (
                        <tr key={link.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-blue-600 hover:underline truncate block max-w-[200px]"
                            >
                              {link.url.replace(/^https?:\/\//, '')}
                            </a>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {link.product}
                            {link.subproduct && <span className="text-gray-400 text-xs"> / {link.subproduct}</span>}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {link.status === "approved" && <CheckCircle className="h-4 w-4 text-green-500 mr-1" />}
                              {link.status === "pending" && <Clock className="h-4 w-4 text-yellow-500 mr-1" />}
                              {link.status === "rejected" && <AlertCircle className="h-4 w-4 text-red-500 mr-1" />}
                              <span className={
                                link.status === "approved" ? "text-green-600" :
                                link.status === "pending" ? "text-yellow-600" :
                                "text-red-600"
                              }>
                                {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{link.clickCount}</td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/links/${link.id}`)}>
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No links found in this category.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
