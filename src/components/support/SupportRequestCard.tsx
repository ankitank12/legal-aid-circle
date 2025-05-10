
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

export interface SupportRequest {
  id: string;
  title: string;
  requestType: 'Financial' | 'Legal' | 'Medical' | 'Other';
  description: string;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string;
  };
  amount?: number;
  status: 'Open' | 'In Progress' | 'Completed' | 'Closed';
  donationsReceived?: number;
  donationsGoal?: number;
}

interface SupportRequestCardProps {
  request: SupportRequest;
  isPreview?: boolean;
}

const SupportRequestCard: React.FC<SupportRequestCardProps> = ({ request, isPreview = false }) => {
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

  const renderDonationProgress = () => {
    if (request.requestType === 'Financial' && request.donationsGoal && request.donationsReceived !== undefined) {
      const progressPercentage = Math.min(Math.round((request.donationsReceived / request.donationsGoal) * 100), 100);
      
      return (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Donation Progress</span>
            <span>
              {formatCurrency(request.donationsReceived)} of {formatCurrency(request.donationsGoal)} ({progressPercentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-legalgold-500 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full flex flex-col border-legalblue-200 hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge className={`${getTypeColor(request.requestType)} font-normal`}>
            {request.requestType}
          </Badge>
          <Badge className={`${getStatusColor(request.status)} font-normal`}>
            {request.status}
          </Badge>
        </div>
        <CardTitle className={isPreview ? 'text-lg' : 'text-xl'}>
          {isPreview ? (
            <Link to={`/support-requests/${request.id}`} className="hover:text-legalblue-700 transition-colors">
              {request.title}
            </Link>
          ) : request.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-x-1">
          Posted by {request.createdBy.name} · {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isPreview ? (
          <p className="text-gray-700 line-clamp-3">{request.description}</p>
        ) : (
          <p className="text-gray-700">{request.description}</p>
        )}
        {renderDonationProgress()}
      </CardContent>
      <CardFooter className="pt-0">
        {isPreview ? (
          <Link to={`/support-requests/${request.id}`} className="w-full">
            <Button variant="outline" className="w-full">View Details</Button>
          </Link>
        ) : (
          request.requestType === 'Financial' && (
            <Button className="w-full bg-legalgold-500 hover:bg-legalgold-600 text-black">
              Support This Request
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
};

export default SupportRequestCard;
