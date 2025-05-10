
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export interface ForumTopic {
  id: string;
  title: string;
  category: string;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string;
  };
  replyCount: number;
  lastReply?: {
    createdAt: Date;
    createdBy: {
      name: string;
    };
  };
  isPinned?: boolean;
  tags?: string[];
}

interface ForumTopicCardProps {
  topic: ForumTopic;
}

const ForumTopicCard: React.FC<ForumTopicCardProps> = ({ topic }) => {
  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'general discussion':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'legal advice':
        return 'bg-legalblue-100 text-legalblue-800 border-legalblue-300';
      case 'career':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'events':
        return 'bg-legalgold-100 text-legalgold-800 border-legalgold-300';
      case 'court proceedings':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'announcements':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="border-legalblue-200 hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={`${getCategoryColor(topic.category)} font-normal`}>
            {topic.category}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <MessageCircle size={16} className="mr-1" />
            <span>{topic.replyCount}</span>
          </div>
        </div>
        <CardTitle className="text-lg mt-2">
          <Link to={`/forum/topics/${topic.id}`} className="hover:text-legalblue-700 transition-colors">
            {topic.isPinned && (
              <span className="inline-block mr-2 text-xs bg-legalgold-100 text-legalgold-800 px-1.5 py-0.5 rounded border border-legalgold-300">
                PINNED
              </span>
            )}
            {topic.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-x-1">
          Started by {topic.createdBy.name} · {formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {topic.tags && topic.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {topic.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-500 pt-0">
        {topic.lastReply ? (
          <div>
            Last reply by <span className="font-medium">{topic.lastReply.createdBy.name}</span> {formatDistanceToNow(new Date(topic.lastReply.createdAt), { addSuffix: true })}
          </div>
        ) : (
          <div>No replies yet</div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ForumTopicCard;
