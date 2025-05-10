
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import NewForumTopicForm from '@/components/forum/NewForumTopicForm';

const NewForumTopic = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "Topic created",
      description: "Your forum topic has been created successfully.",
    });
    navigate('/forum');
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Alert className="mb-8 bg-legalblue-50 border-legalblue-300">
          <AlertTitle className="text-legalblue-900">Authentication Required</AlertTitle>
          <AlertDescription>
            You need to be logged in to create forum topics. Please login or register to continue.
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="border-legalblue-300 text-legalblue-900">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-legalblue-900 hover:bg-legalblue-700">
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-legalblue-900 mb-2">Create New Topic</h1>
        <p className="text-gray-600">Start a new discussion in the community forum</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <NewForumTopicForm onSuccess={handleSuccess} />
        </div>
        
        <div>
          <Card className="border-legalblue-200 shadow">
            <CardContent className="pt-6">
              <h3 className="text-xl font-serif font-bold mb-4">Forum Guidelines</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>Keep discussions respectful and professional.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>Use a clear, descriptive title for your topic.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>Add relevant tags to help others find your topic.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>Check if a similar topic already exists before creating a new one.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>Do not share confidential client information.</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-2">Popular Categories</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">General Discussion</span>
                  <span className="bg-legalblue-100 text-legalblue-800 px-2 py-1 rounded text-xs">Legal Advice</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Career</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Court Proceedings</span>
                  <span className="bg-legalgold-100 text-legalgold-800 px-2 py-1 rounded text-xs">Events</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Announcements</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewForumTopic;
