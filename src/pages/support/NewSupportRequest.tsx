
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import NewSupportRequestForm from '@/components/support/NewSupportRequestForm';

const NewSupportRequest = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "Support request created",
      description: "Your request has been submitted successfully and is now visible to the community.",
    });
    navigate('/support-requests');
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Alert className="mb-8 bg-legalblue-50 border-legalblue-300">
          <AlertTitle className="text-legalblue-900">Authentication Required</AlertTitle>
          <AlertDescription>
            You need to be logged in to create a support request. Please login or register to continue.
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
        <h1 className="text-3xl font-serif font-bold text-legalblue-900 mb-2">Create Support Request</h1>
        <p className="text-gray-600">Submit a request for support from the legal community</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <NewSupportRequestForm onSuccess={handleSuccess} />
        </div>
        
        <div>
          <Card className="border-legalblue-200 shadow">
            <CardContent className="pt-6">
              <h3 className="text-xl font-serif font-bold mb-4">Guidelines for Support Requests</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>Be clear and specific about the support needed.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>For financial support, specify the amount needed and its purpose.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>Provide relevant details that will help the community understand the situation.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>For requests on behalf of others, clearly mention your relationship with the beneficiary.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>All requests are reviewed by moderators before being published.</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-2">Need Help?</h4>
                <p className="text-gray-600 text-sm">
                  If you need assistance with creating your support request, please contact our support team at <a href="mailto:support@legalaid-connect.org" className="text-legalblue-700 hover:underline">support@legalaid-connect.org</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewSupportRequest;
