
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

interface DonationFormProps {
  requestId?: string;
  requestTitle?: string;
  onSuccess: () => void;
  defaultAmount?: number;
}

const DonationForm: React.FC<DonationFormProps> = ({ 
  requestId, 
  requestTitle, 
  onSuccess,
  defaultAmount = 1000
}) => {
  const [amount, setAmount] = useState(defaultAmount.toString());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [donationType, setDonationType] = useState('oneTime');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // This would be where we integrate with a payment gateway like Stripe
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Thank you for your donation!",
        description: "Your donation has been processed successfully.",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-legalblue-200 shadow">
      <CardHeader className="pb-3">
        <CardTitle>Make a Donation</CardTitle>
        <CardDescription>
          {requestTitle 
            ? `Support "${requestTitle}" with your donation` 
            : "Support the lawyer community with your donation"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Donation Amount (₹)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {[500, 1000, 2000, 5000, 10000].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={amount === value.toString() ? "default" : "outline"}
                  className={amount === value.toString() ? "bg-legalgold-500 hover:bg-legalgold-600 text-black" : ""}
                  onClick={() => handleQuickAmount(value)}
                >
                  ₹{value.toLocaleString('en-IN')}
                </Button>
              ))}
            </div>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              required
              className="text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="donationType">Donation Type</Label>
            <Select
              value={donationType}
              onValueChange={setDonationType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select donation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oneTime">One-time Donation</SelectItem>
                <SelectItem value="monthly">Monthly Donation</SelectItem>
                <SelectItem value="quarterly">Quarterly Donation</SelectItem>
                <SelectItem value="yearly">Yearly Donation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required={!isAnonymous}
              disabled={isAnonymous}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a message with your donation"
              rows={3}
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="anonymous" 
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked === true)}
            />
            <Label htmlFor="anonymous" className="font-normal">
              Make this donation anonymous
            </Label>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-legalgold-500 hover:bg-legalgold-600 text-black mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : `Donate ₹${parseInt(amount).toLocaleString('en-IN')}`}
          </Button>
          
          <p className="text-sm text-gray-500 text-center">
            Your donation helps provide financial security to families of lawyers in need.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;
