
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LinkIcon, Search, PlusCircle, LayoutDashboard, CheckSquare } from "lucide-react";

interface NavBarProps {
  user: { name: string; role: string } | null;
}

const NavBar = ({ user }: NavBarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <LinkIcon className="h-6 w-6 text-blue-600 mr-2" />
              <span className="font-bold text-xl text-gray-800">LinkFlow</span>
            </Link>
            
            <nav className="ml-8 hidden md:flex space-x-1">
              <Link to="/">
                <Button 
                  variant={isActive('/') ? "default" : "ghost"}
                  className="flex items-center"
                  size="sm"
                >
                  <Search className="h-4 w-4 mr-1" /> Search
                </Button>
              </Link>
              <Link to="/submit">
                <Button 
                  variant={isActive('/submit') ? "default" : "ghost"}
                  className="flex items-center"
                  size="sm"
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Submit Link
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button 
                  variant={isActive('/dashboard') ? "default" : "ghost"}
                  className="flex items-center"
                  size="sm"
                >
                  <LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard
                </Button>
              </Link>
              
              {/* Only show review queue for reviewers and admins */}
              {user && (user.role === "Reviewer" || user.role === "Admin") && (
                <Link to="/review">
                  <Button 
                    variant={isActive('/review') ? "default" : "ghost"}
                    className="flex items-center"
                    size="sm"
                  >
                    <CheckSquare className="h-4 w-4 mr-1" /> Review Queue
                  </Button>
                </Link>
              )}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center">
                <div className="mr-2 text-right hidden sm:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
              </div>
            ) : (
              <Button>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
