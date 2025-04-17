
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

const Layout = () => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  // Simulating user authentication
  useEffect(() => {
    const simulateLogin = () => {
      // In a real app, this would come from authentication
      setUser({ name: "Alice Johnson", role: "Admin" });
      toast({
        title: "Welcome back",
        description: "You are logged in as Admin",
      });
    };

    // Simulate a small delay before "logging in"
    const timer = setTimeout(simulateLogin, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar user={user} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          Link Flow Navigator &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
