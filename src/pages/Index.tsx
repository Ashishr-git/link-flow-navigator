
import SearchBar from "@/components/SearchBar";
import LinkList from "@/components/LinkList";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Search } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Link Flow Navigator</h1>
          <p className="text-xl opacity-90">Manage, approve, and discover navigation links across your digital products</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/submit">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <PlusCircle className="mr-2 h-5 w-5" />
                Submit New Link
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Search className="mr-2 h-5 w-5 text-blue-500" />
            Search Navigation Links
          </h2>
          <SearchBar onSearch={setSearchQuery} />
          
          <div className="mt-6">
            <LinkList searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
