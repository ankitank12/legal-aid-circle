
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-legalblue-900 mb-2">404</h1>
          <h2 className="text-2xl font-serif mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <Link to="/">
            <Button className="bg-legalblue-900 hover:bg-legalblue-700">
              Return to Home
            </Button>
          </Link>
          
          <div className="text-sm text-gray-500 pt-8">
            <p>You might want to check these pages:</p>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <Link to="/support-requests" className="text-legalblue-600 hover:underline">
                Support Requests
              </Link>
              <Link to="/forum" className="text-legalblue-600 hover:underline">
                Forum
              </Link>
              <Link to="/about" className="text-legalblue-600 hover:underline">
                About Us
              </Link>
              <Link to="/login" className="text-legalblue-600 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
