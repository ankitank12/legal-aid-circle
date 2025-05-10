
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface NewSupportRequestFormProps {
  onSuccess: () => void;
}

const NewSupportRequestForm: React.FC<NewSupportRequestFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    requestType: '',
    description: '',
    amount: '',
    recipientName: '',
    recipientRelationship: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Support request created",
        description: "Your request has been submitted successfully.",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit support request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="border-legalblue-200 shadow">
      <CardHeader>
        <CardTitle>Submit Support Request</CardTitle>
        <CardDescription>
          Create a new request for support from the legal community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Request Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="E.g., Support for family of Adv. Rajesh Kumar"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="requestType">Request Type</Label>
            <Select
              onValueChange={handleSelectChange('requestType')}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type of support needed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Financial">Financial Support</SelectItem>
                <SelectItem value="Legal">Legal Assistance</SelectItem>
                <SelectItem value="Medical">Medical Support</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Please provide details about the support needed..."
              rows={5}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          {formData.requestType === 'Financial' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="amount">Target Amount (₹)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Amount needed (in INR)"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  name="recipientName"
                  placeholder="Name of the person/family receiving support"
                  value={formData.recipientName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipientRelationship">Relationship to Requester</Label>
                <Select
                  onValueChange={handleSelectChange('recipientRelationship')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Self">Self</SelectItem>
                    <SelectItem value="Family of deceased colleague">Family of deceased colleague</SelectItem>
                    <SelectItem value="Colleague in need">Colleague in need</SelectItem>
                    <SelectItem value="Family member">Family member</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        
          <CardFooter className="flex justify-end px-0 pt-4">
            <Button
              type="submit"
              className="bg-legalblue-900 hover:bg-legalblue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewSupportRequestForm;
