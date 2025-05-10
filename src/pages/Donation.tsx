
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import DonationForm from '@/components/donations/DonationForm';

const Donation = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "Thank you for your donation!",
      description: "Your generous contribution will help support the legal community.",
    });
    navigate('/');
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-legalblue-900 mb-2">Make a Donation</h1>
        <p className="text-gray-600">Support the lawyer community with your contribution</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {isAuthenticated ? (
            <DonationForm onSuccess={handleSuccess} />
          ) : (
            <>
              <Alert className="mb-8 bg-legalblue-50 border-legalblue-300">
                <AlertTitle className="text-legalblue-900">Authentication Recommended</AlertTitle>
                <AlertDescription>
                  While you can make an anonymous donation without logging in, creating an account allows you to track your donations and receive updates.
                </AlertDescription>
              </Alert>
              
              <DonationForm onSuccess={handleSuccess} />
            </>
          )}
        </div>
        
        <div>
          <Card className="border-legalblue-200 shadow">
            <CardContent className="pt-6">
              <h3 className="text-xl font-serif font-bold mb-4">How Your Donation Helps</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>Provides financial assistance to families of lawyers who have passed away</span>
                </li>
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>Supports education expenses for children of deceased lawyers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>Helps with medical expenses for lawyers facing health crises</span>
                </li>
                <li className="flex items-start">
                  <span className="text-legalgold-500 font-bold mr-2">•</span>
                  <span>Contributes to community outreach and support programs</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-2">Testimonial</h4>
                <blockquote className="italic text-gray-600">
                  "The support from the legal community helped my family through the most difficult time after my husband's passing. We are forever grateful."
                </blockquote>
                <p className="mt-2 text-sm text-gray-500">— Mrs. Sharma, wife of late Adv. Rajesh Sharma</p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-2">Have a specific cause?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  If you'd like to support a specific lawyer or family in need, check our current support requests.
                </p>
                <Link to="/support-requests">
                  <Button variant="outline" className="w-full border-legalblue-300 text-legalblue-900">
                    View Support Requests
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Donation;
