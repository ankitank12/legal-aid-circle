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
import ForumTopicCard, { ForumTopic } from '@/components/forum/ForumTopicCard';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

const Forum = () => {
  const { isAuthenticated } = useAuth();
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for forum topics
  const forumTopics: ForumTopic[] = [
    {
      id: '1',
      title: 'Discussion on the new Bar Council regulations',
      category: 'Announcements',
      createdAt: new Date('2023-04-19'),
      createdBy: {
        id: '1',
        name: 'Admin User'
      },
      replyCount: 23,
      lastReply: {
        createdAt: new Date('2023-04-21'),
        createdBy: {
          name: 'Vikram Singh'
        }
      },
      isPinned: true,
      tags: ['regulations', 'bar council']
    },
    {
      id: '2',
      title: 'Annual Legal Conference 2023 - Registration Open',
      category: 'Events',
      createdAt: new Date('2023-04-16'),
      createdBy: {
        id: '3',
        name: 'Amit Sharma'
      },
      replyCount: 15,
      lastReply: {
        createdAt: new Date('2023-04-20'),
        createdBy: {
          name: 'Rahul Mehta'
        }
      },
      tags: ['conference', 'event', 'networking']
    },
    {
      id: '3',
      title: 'Guidance needed on a complex tax evasion case',
      category: 'Legal Advice',
      createdAt: new Date('2023-04-14'),
      createdBy: {
        id: '6',
        name: 'Neha Kapoor'
      },
      replyCount: 7,
      lastReply: {
        createdAt: new Date('2023-04-18'),
        createdBy: {
          name: 'John Doe'
        }
      }
    },
    {
      id: '4',
      title: 'Upcoming webinar: Digital Evidence in Criminal Trials',
      category: 'Events',
      createdAt: new Date('2023-04-12'),
      createdBy: {
        id: '8',
        name: 'Priya Singh'
      },
      replyCount: 5,
      tags: ['webinar', 'criminal law', 'digital evidence']
    },
    {
      id: '5',
      title: 'Recent Supreme Court judgment on environmental regulations',
      category: 'Court Proceedings',
      createdAt: new Date('2023-04-10'),
      createdBy: {
        id: '2',
        name: 'John Doe'
      },
      replyCount: 18,
      lastReply: {
        createdAt: new Date('2023-04-15'),
        createdBy: {
          name: 'Suresh Kumar'
        }
      },
      tags: ['supreme court', 'environmental law']
    },
    {
      id: '6',
      title: 'Career transition from litigation to corporate law',
      category: 'Career',
      createdAt: new Date('2023-04-08'),
      createdBy: {
        id: '9',
        name: 'Rajiv Patel'
      },
      replyCount: 12,
      lastReply: {
        createdAt: new Date('2023-04-14'),
        createdBy: {
          name: 'Meena Gupta'
        }
      },
      tags: ['career advice', 'corporate law']
    },
    {
      id: '7',
      title: 'Best practices for client billing and invoicing',
      category: 'General Discussion',
      createdAt: new Date('2023-04-05'),
      createdBy: {
        id: '10',
        name: 'Deepak Sharma'
      },
      replyCount: 9,
      lastReply: {
        createdAt: new Date('2023-04-11'),
        createdBy: {
          name: 'Admin User'
        }
      },
      tags: ['practice management', 'billing']
    },
    {
      id: '8',
      title: 'Legal aid initiatives in rural areas - Volunteers needed',
      category: 'Announcements',
      createdAt: new Date('2023-04-03'),
      createdBy: {
        id: '1',
        name: 'Admin User'
      },
      replyCount: 14,
      lastReply: {
        createdAt: new Date('2023-04-17'),
        createdBy: {
          name: 'Vikram Singh'
        }
      },
      tags: ['legal aid', 'volunteer', 'rural']
    },
  ];

  // Filter topics based on category and search term
  const filteredTopics = forumTopics.filter(topic => {
    const matchesCategory = category === 'all' || topic.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (topic.tags && topic.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // Sort topics based on selected sort option
  const sortedTopics = [...filteredTopics].sort((a, b) => {
    // Always show pinned topics first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    if (sort === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sort === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sort === 'most_replies') {
      return b.replyCount - a.replyCount;
    } else if (sort === 'least_replies') {
      return a.replyCount - b.replyCount;
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-legalblue-900">Community Forum</h1>
          <p className="text-gray-600 mt-2">Discuss legal topics and connect with fellow professionals</p>
        </div>
        {isAuthenticated && (
          <div className="mt-4 md:mt-0">
            <Link to="/forum/new">
              <Button className="bg-legalblue-900 hover:bg-legalblue-700">
                Create New Topic
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setCategory}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Topics</TabsTrigger>
          <TabsTrigger value="general discussion">General</TabsTrigger>
          <TabsTrigger value="legal advice">Legal Advice</TabsTrigger>
          <TabsTrigger value="career">Career</TabsTrigger>
          <TabsTrigger value="court proceedings">Court Proceedings</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search topics or tags..."
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
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="most_replies">Most Replies</SelectItem>
              <SelectItem value="least_replies">Least Replies</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="all" className="mt-0">
          {sortedTopics.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {sortedTopics.map(topic => (
                <ForumTopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No topics found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>
        
        {/* Other tab contents have similar structure */}
        {['general discussion', 'legal advice', 'career', 'court proceedings', 'events', 'announcements'].map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-0">
            {sortedTopics.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {sortedTopics.map(topic => (
                  <ForumTopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No topics found in this category</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      {!isAuthenticated && (
        <div className="bg-legalblue-50 border border-legalblue-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-serif font-bold text-legalblue-900 mb-2">Join the conversation</h3>
          <p className="text-gray-700 mb-4">Login or register to create topics and participate in forum discussions.</p>
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

export default Forum;
