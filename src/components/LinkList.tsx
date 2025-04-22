
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockLinks } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import { NavLink } from "@/types/types";

type LinkListProps = {
  searchQuery: string;
};

const LinkList = ({ searchQuery }: LinkListProps) => {
  const [links, setLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call with the search query
    let filteredLinks = [...mockLinks];
    
    if (searchQuery) {
      filteredLinks = mockLinks.filter(
        (link) =>
          link.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.keywords.some((keyword) =>
            keyword.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }
    
    setLinks(filteredLinks);
  }, [searchQuery]);

  const handleVote = (id: string, isUpvote: boolean) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => {
        if (link.id === id) {
          if (isUpvote) {
            return { ...link, upvotes: link.upvotes + 1 };
          } else {
            return { ...link, downvotes: link.downvotes + 1 };
          }
        }
        return link;
      })
    );
  };

  if (links.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No links found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map((link) => (
        <Card key={link.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-semibold truncate">
                <Link to={`/links/${link.id}`} className="hover:text-blue-600 transition-colors">
                  {link.url.replace(/^https?:\/\//, '').split('/')[0]}
                </Link>
              </CardTitle>
              <Badge className={
                link.status === 'approved' ? 'bg-green-100 text-green-800' :
                link.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                link.status === 'deployed' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }>
                {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{link.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {link.keywords.map((keyword, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
            <div className="mt-3 flex items-center text-xs text-gray-500">
              <Badge variant="secondary" className="mr-2">{link.platform}</Badge>
              <span>{link.product}</span>
              {link.subproduct && (
                <>
                  <span className="mx-1">•</span>
                  <span>{link.subproduct}</span>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2 border-t">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleVote(link.id, true)}
                className="text-gray-600 hover:text-green-600"
              >
                <ThumbsUp className="h-4 w-4 mr-1" /> 
                <span className="text-xs">{link.upvotes}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleVote(link.id, false)}
                className="text-gray-600 hover:text-red-600"
              >
                <ThumbsDown className="h-4 w-4 mr-1" /> 
                <span className="text-xs">{link.downvotes}</span>
              </Button>
            </div>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                Visit
              </Button>
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default LinkList;
