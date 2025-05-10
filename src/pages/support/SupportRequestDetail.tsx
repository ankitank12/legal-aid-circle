
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow, format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import DonationForm from '@/components/donations/DonationForm';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string;
    image?: string;
  };
}

interface Donation {
  id: string;
  amount: number;
  message?: string;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string;
    isAnonymous: boolean;
  };
}

const SupportRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('details');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Mock data for a single support request
  const supportRequest = {
    id: '1',
    title: 'Support for family of Adv. Rajesh Kumar',
    requestType: 'Financial',
    description: 'Advocate Rajesh Kumar passed away on 15th April after a brief illness. He is survived by his wife and two school-going children. The family needs financial support to manage their daily expenses and children\'s education.\n\nRajesh was a dedicated lawyer who had been practicing for the last 12 years in the district court. He was known for his pro-bono work for underprivileged clients. Unfortunately, due to the sudden nature of his illness and the high medical expenses incurred during his treatment, the family is now facing financial difficulties.\n\nThe funds raised will be directly transferred to his wife\'s bank account and will be used for:\n1. Daily expenses and household needs\n2. School fees for their children aged 10 and 8\n3. Rent for their residence\n\nAny contribution from the legal fraternity would be greatly appreciated and would help this family during this difficult time.',
    createdAt: new Date('2023-04-20'),
    updatedAt: new Date('2023-04-21'),
    createdBy: {
      id: '3',
      name: 'Amit Sharma',
      image: ''
    },
    status: 'Open',
    donationsReceived: 120000,
    donationsGoal: 500000,
    recipientName: 'Mrs. Sunita Kumar',
    recipientRelationship: 'Wife of deceased advocate'
  };

  // Mock data for comments
  const comments: Comment[] = [
    {
      id: '1',
      text: 'I had the privilege of working with Adv. Rajesh on several cases. He was a brilliant lawyer and an even better human being. My deepest condolences to the family.',
      createdAt: new Date('2023-04-21T10:30:00'),
      createdBy: {
        id: '4',
        name: 'Sunil Gupta',
        image: ''
      }
    },
    {
      id: '2',
      text: "This is such a tragic loss. I've made a donation and encourage others to help this family during this difficult time.",
      createdAt: new Date('2023-04-22T14:15:00'),
      createdBy: {
        id: '5',
        name: 'Priya Patel',
        image: ''
      }
    }
  ];

  // Mock data for donations
  const donations: Donation[] = [
    {
      id: '1',
      amount: 10000,
      message: 'My heartfelt condolences to the family. May they find strength in this difficult time.',
      createdAt: new Date('2023-04-21T09:20:00'),
      createdBy: {
        id: '6',
        name: 'Vikram Singh',
        isAnonymous: false
      }
    },
    {
      id: '2',
      amount: 25000,
      createdAt: new Date('2023-04-21T11:45:00'),
      createdBy: {
        id: '7',
        name: 'Anonymous Donor',
        isAnonymous: true
      }
    },
    {
      id: '3',
      amount: 5000,
      message: 'Rajesh was my colleague. Praying for his family.',
      createdAt: new Date('2023-04-22T16:30:00'),
      createdBy: {
        id: '8',
        name: 'Neha Verma',
        isAnonymous: false
      }
    }
  ];

  const handleDonationSuccess = () => {
    setActiveTab('details');
    window.scrollTo(0, 0);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Comment posted",
        description: "Your comment has been added successfully.",
      });
      
      setCommentText('');
      // In a real app, we would fetch updated comments
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Open':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-purple-100 text-purple-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Financial':
        return 'bg-legalgold-100 text-legalgold-800 border-legalgold-300';
      case 'Legal':
        return 'bg-legalblue-100 text-legalblue-800 border-legalblue-300';
      case 'Medical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Other':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  if (!supportRequest) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Support request not found</h2>
        <p className="text-gray-600 mb-6">The support request you're looking for doesn't exist or has been removed.</p>
        <Link to="/support-requests">
          <Button>Back to Support Requests</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/support-requests" className="text-legalblue-600 hover:text-legalblue-800 inline-flex items-center mb-4">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Support Requests
        </Link>
        
        <div className="flex justify-between items-start flex-wrap md:flex-nowrap gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className={getTypeColor(supportRequest.requestType)}>
                {supportRequest.requestType}
              </Badge>
              <Badge className={getStatusColor(supportRequest.status)}>
                {supportRequest.status}
              </Badge>
            </div>
            <h1 className="text-3xl font-serif font-bold text-legalblue-900">{supportRequest.title}</h1>
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <span>Posted by {supportRequest.createdBy.name}</span>
              <span className="mx-2">•</span>
              <span>{formatDistanceToNow(new Date(supportRequest.createdAt), { addSuffix: true })}</span>
            </div>
          </div>

          {supportRequest.requestType === 'Financial' && (
            <div className="ml-auto">
              <Button 
                className="bg-legalgold-500 hover:bg-legalgold-600 text-black"
                onClick={() => setActiveTab('donate')}
              >
                Support This Request
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
              <TabsTrigger value="donations">Donations ({donations.length})</TabsTrigger>
              <TabsTrigger value="donate">Donate</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <Card className="border-legalblue-200">
                <CardHeader>
                  <CardTitle className="text-lg">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    {supportRequest.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {supportRequest.requestType === 'Financial' && (
                <Card className="border-legalblue-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Funding Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Donation Target</span>
                        <span>{formatCurrency(supportRequest.donationsGoal)}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Donations Received</span>
                        <span>{formatCurrency(supportRequest.donationsReceived)}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Remaining Goal</span>
                        <span>{formatCurrency(supportRequest.donationsGoal - supportRequest.donationsReceived)}</span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-legalgold-500 h-2.5 rounded-full" 
                        style={{ width: `${Math.min((supportRequest.donationsReceived / supportRequest.donationsGoal) * 100, 100)}%` }}
                      />
                    </div>
                    
                    <div className="text-sm text-center text-gray-600">
                      {Math.round((supportRequest.donationsReceived / supportRequest.donationsGoal) * 100)}% of goal achieved
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="mb-2"><strong>Recipient:</strong> {supportRequest.recipientName}</div>
                      <div><strong>Relationship:</strong> {supportRequest.recipientRelationship}</div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="comments" className="space-y-6">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.createdBy.image} alt={comment.createdBy.name} />
                        <AvatarFallback className="bg-legalblue-100 text-legalblue-800">
                          {getInitials(comment.createdBy.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <div className="font-medium">{comment.createdBy.name}</div>
                          <div className="text-xs text-gray-500">
                            {format(new Date(comment.createdAt), 'PP')} at {format(new Date(comment.createdAt), 'p')}
                          </div>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No comments yet</h3>
                  <p className="text-gray-500">Be the first to comment on this support request</p>
                </div>
              )}
              
              {isAuthenticated ? (
                <form onSubmit={handleCommentSubmit} className="mt-6 border border-gray-200 rounded-lg p-4">
                  <div className="mb-4">
                    <label htmlFor="comment" className="block font-medium mb-2">Add a Comment</label>
                    <Textarea
                      id="comment"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write your comment here..."
                      rows={4}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-legalblue-900 hover:bg-legalblue-700"
                    >
                      {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="mt-6 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-gray-700 mb-3">You need to be logged in to comment</p>
                  <div className="flex justify-center space-x-4">
                    <Link to="/login">
                      <Button variant="outline">Login</Button>
                    </Link>
                    <Link to="/register">
                      <Button>Register</Button>
                    </Link>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="donations" className="space-y-4">
              {donations.length > 0 ? (
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="text-xl font-bold mb-2 text-center text-legalblue-900">
                      {formatCurrency(supportRequest.donationsReceived)} raised of {formatCurrency(supportRequest.donationsGoal)} goal
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-legalgold-500 h-2.5 rounded-full" 
                        style={{ width: `${Math.min((supportRequest.donationsReceived / supportRequest.donationsGoal) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-sm text-center text-gray-600">
                      {Math.round((supportRequest.donationsReceived / supportRequest.donationsGoal) * 100)}% of goal achieved from {donations.length} donations
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {donations.map((donation) => (
                      <div key={donation.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">
                              {donation.createdBy.isAnonymous ? "Anonymous" : donation.createdBy.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {format(new Date(donation.createdAt), 'PP')}
                            </div>
                          </div>
                          <div className="text-lg font-bold text-legalgold-600">
                            {formatCurrency(donation.amount)}
                          </div>
                        </div>
                        {donation.message && (
                          <div className="mt-2 text-gray-700">
                            "{donation.message}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button 
                      className="bg-legalgold-500 hover:bg-legalgold-600 text-black"
                      onClick={() => setActiveTab('donate')}
                    >
                      Make a Donation
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No donations yet</h3>
                  <p className="text-gray-500 mb-6">Be the first to donate to this support request</p>
                  <Button 
                    className="bg-legalgold-500 hover:bg-legalgold-600 text-black"
                    onClick={() => setActiveTab('donate')}
                  >
                    Make a Donation
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="donate">
              {isAuthenticated ? (
                <DonationForm 
                  requestId={supportRequest.id} 
                  requestTitle={supportRequest.title} 
                  onSuccess={handleDonationSuccess}
                  defaultAmount={5000}
                />
              ) : (
                <Card className="border-legalblue-200">
                  <CardContent className="pt-6 text-center">
                    <h3 className="text-xl font-medium text-legalblue-900 mb-4">Authentication Required</h3>
                    <p className="text-gray-600 mb-6">You need to be logged in to make a donation</p>
                    <div className="flex justify-center space-x-4">
                      <Link to="/login">
                        <Button variant="outline">Login</Button>
                      </Link>
                      <Link to="/register">
                        <Button>Register</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card className="border-legalblue-200">
            <CardHeader>
              <CardTitle className="text-lg">About the Requester</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={supportRequest.createdBy.image} alt={supportRequest.createdBy.name} />
                  <AvatarFallback className="bg-legalblue-100 text-legalblue-800">
                    {getInitials(supportRequest.createdBy.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{supportRequest.createdBy.name}</div>
                  <div className="text-sm text-gray-500">Member since {format(new Date(), 'MMMM yyyy')}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {supportRequest.requestType === 'Financial' && (
            <Card className="border-legalblue-200">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-legalgold-500 hover:bg-legalgold-600 text-black"
                  onClick={() => setActiveTab('donate')}
                >
                  Make a Donation
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab('comments')}
                >
                  Leave a Comment
                </Button>
                <div className="pt-4 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600 mb-2">Share this request</p>
                  <div className="flex justify-center space-x-4">
                    <button aria-label="Share on Facebook" className="text-blue-600 hover:text-blue-800">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </button>
                    <button aria-label="Share on Twitter" className="text-blue-400 hover:text-blue-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </button>
                    <button aria-label="Share by Email" className="text-gray-600 hover:text-gray-800">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button aria-label="Copy Link" className="text-gray-600 hover:text-gray-800">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 11v-2h8v2H8zm0 4v-2h8v2H8zm0 4v-2h8v2H8zm-2-16v16h12V3H6zm14-2H4v20h16V1z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card className="border-legalblue-200">
            <CardHeader>
              <CardTitle className="text-lg">Support Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge className={getStatusColor(supportRequest.status)}>
                  {supportRequest.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Posted:</span>
                <span>{format(new Date(supportRequest.createdAt), 'PP')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span>{format(new Date(supportRequest.updatedAt), 'PP')}</span>
              </div>
              {supportRequest.requestType === 'Financial' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Amount:</span>
                  <span>{formatCurrency(supportRequest.donationsGoal)}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportRequestDetail;
