
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SupportRequestCard, { SupportRequest } from '@/components/support/SupportRequestCard';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

const SupportRequests = () => {
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for support requests
  const supportRequests: SupportRequest[] = [
    {
      id: '1',
      title: 'Support for family of Adv. Rajesh Kumar',
      requestType: 'Financial',
      description: 'Advocate Rajesh Kumar passed away on 15th April after a brief illness. He is survived by his wife and two school-going children. The family needs financial support to manage their daily expenses and children\'s education.',
      createdAt: new Date('2023-04-20'),
      createdBy: {
        id: '3',
        name: 'Amit Sharma'
      },
      status: 'Open',
      donationsReceived: 120000,
      donationsGoal: 500000
    },
    {
      id: '2',
      title: 'Medical assistance for Adv. Priya Verma',
      requestType: 'Medical',
      description: 'Advocate Priya Verma requires urgent medical treatment for a critical condition. She has been a dedicated member of our legal community for over 15 years.',
      createdAt: new Date('2023-04-18'),
      createdBy: {
        id: '4',
        name: 'Sunil Gupta'
      },
      status: 'In Progress',
      donationsReceived: 75000,
      donationsGoal: 300000
    },
    {
      id: '3',
      title: 'Legal aid for senior advocate\'s property dispute',
      requestType: 'Legal',
      description: 'Senior Advocate Prakash Joshi, who is now 78 years old and in poor health, needs assistance with a complex property dispute that threatens his only residence.',
      createdAt: new Date('2023-04-15'),
      createdBy: {
        id: '5',
        name: 'Deepak Patel'
      },
      status: 'Open'
    },
    {
      id: '4',
      title: 'Support for family of Adv. Meena Kumari',
      requestType: 'Financial',
      description: 'Advocate Meena Kumari passed away in a road accident last week. She was the sole breadwinner for her family, including her elderly parents and 10-year-old daughter.',
      createdAt: new Date('2023-04-10'),
      createdBy: {
        id: '6',
        name: 'Vinod Sharma'
      },
      status: 'Open',
      donationsReceived: 205000,
      donationsGoal: 400000
    },
    {
      id: '5',
      title: 'Medical support for Adv. Sanjay Gupta\'s surgery',
      requestType: 'Medical',
      description: 'Advocate Sanjay Gupta needs to undergo an urgent heart surgery. He has been practicing law for over 20 years but is currently facing financial difficulties.',
      createdAt: new Date('2023-04-05'),
      createdBy: {
        id: '7',
        name: 'Rahul Kumar'
      },
      status: 'Completed',
      donationsReceived: 350000,
      donationsGoal: 350000
    },
    {
      id: '6',
      title: 'Support for junior lawyer\'s education expenses',
      requestType: 'Financial',
      description: 'A young lawyer who recently joined the bar is seeking support for advanced legal education to specialize in environmental law. This will enable them to better serve underrepresented communities.',
      createdAt: new Date('2023-04-02'),
      createdBy: {
        id: '8',
        name: 'Neelam Singh'
      },
      status: 'Open',
      donationsReceived: 30000,
      donationsGoal: 150000
    },
  ];

  // Filter requests based on type and search term
  const filteredRequests = supportRequests.filter(request => {
    const matchesFilter = filter === 'all' || request.requestType.toLowerCase() === filter.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort requests based on selected sort option
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sort === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sort === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sort === 'mostFunded' && a.donationsReceived && b.donationsReceived) {
      return b.donationsReceived - a.donationsReceived;
    } else if (sort === 'leastFunded' && a.donationsReceived && b.donationsReceived) {
      return a.donationsReceived - b.donationsReceived;
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-legalblue-900">Support Requests</h1>
          <p className="text-gray-600 mt-2">Browse current requests for support from the legal community</p>
        </div>
        {isAuthenticated && (
          <div className="mt-4 md:mt-0">
            <Link to="/support-requests/new">
              <Button className="bg-legalgold-500 hover:bg-legalgold-600 text-black">
                Create Support Request
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setFilter}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="Financial">Financial</TabsTrigger>
          <TabsTrigger value="Medical">Medical</TabsTrigger>
          <TabsTrigger value="Legal">Legal</TabsTrigger>
          <TabsTrigger value="Other">Other</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search requests..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="mostFunded">Most Funded</SelectItem>
              <SelectItem value="leastFunded">Least Funded</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="all" className="mt-0">
          {sortedRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRequests.map(request => (
                <SupportRequestCard key={request.id} request={request} isPreview={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No support requests found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="Financial" className="mt-0">
          {sortedRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRequests.map(request => (
                <SupportRequestCard key={request.id} request={request} isPreview={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No financial support requests found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="Medical" className="mt-0">
          {sortedRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRequests.map(request => (
                <SupportRequestCard key={request.id} request={request} isPreview={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No medical support requests found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="Legal" className="mt-0">
          {sortedRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRequests.map(request => (
                <SupportRequestCard key={request.id} request={request} isPreview={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No legal support requests found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="Other" className="mt-0">
          {sortedRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRequests.map(request => (
                <SupportRequestCard key={request.id} request={request} isPreview={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No other support requests found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {!isAuthenticated && (
        <div className="bg-legalblue-50 border border-legalblue-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-serif font-bold text-legalblue-900 mb-2">Want to create a support request?</h3>
          <p className="text-gray-700 mb-4">You need to be a registered member to submit a support request.</p>
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
      )}
    </div>
  );
};

export default SupportRequests;
