
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import SupportRequestCard, { SupportRequest } from '@/components/support/SupportRequestCard';
import ForumTopicCard, { ForumTopic } from '@/components/forum/ForumTopicCard';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  // Mock data for recent support requests
  const recentSupportRequests: SupportRequest[] = [
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
  ];

  // Mock data for recent forum topics
  const recentForumTopics: ForumTopic[] = [
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
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-legalblue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Lawyers Supporting Lawyers
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              A platform for legal professionals to connect, support, and secure the future of lawyers' families during difficult times.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-legalgold-500 hover:bg-legalgold-600 text-black">
                      Join Our Community
                    </Button>
                  </Link>
                  <Link to="/support-requests">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-legalblue-900">
                      View Support Requests
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/support-requests/new">
                    <Button size="lg" className="bg-legalgold-500 hover:bg-legalgold-600 text-black">
                      Create Support Request
                    </Button>
                  </Link>
                  <Link to="/support-requests">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-legalblue-900">
                      View Support Requests
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-legalblue-900 mb-4">How We Support the Legal Community</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers multiple ways for legal professionals to help each other, especially in times of need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-legalblue-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="bg-legalblue-100 rounded-full p-3 inline-block">
                    <svg className="w-10 h-10 text-legalblue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-bold mt-4 mb-2">Financial Support</h3>
                  <p className="text-gray-600">
                    Provide financial assistance to families of lawyers who have passed away or are going through hardships.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-legalblue-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="bg-legalblue-100 rounded-full p-3 inline-block">
                    <svg className="w-10 h-10 text-legalblue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-bold mt-4 mb-2">Community Forum</h3>
                  <p className="text-gray-600">
                    Connect with peers, share knowledge, and collaborate on professional challenges through our dedicated forum.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-legalblue-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="bg-legalblue-100 rounded-full p-3 inline-block">
                    <svg className="w-10 h-10 text-legalblue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-bold mt-4 mb-2">Legal Aid</h3>
                  <p className="text-gray-600">
                    Request and provide legal assistance for complex cases requiring specialized expertise or additional support.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Support Requests */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-legalblue-900">Recent Support Requests</h2>
            <Link to="/support-requests">
              <Button variant="outline" className="border-legalblue-300 text-legalblue-900">
                View All Requests
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentSupportRequests.map(request => (
              <SupportRequestCard key={request.id} request={request} isPreview={true} />
            ))}
          </div>
          
          {isAuthenticated && (
            <div className="mt-8 text-center">
              <Link to="/support-requests/new">
                <Button className="bg-legalblue-900 hover:bg-legalblue-700">
                  Create Support Request
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* Recent Forum Topics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-legalblue-900">Recent Forum Discussions</h2>
            <Link to="/forum">
              <Button variant="outline" className="border-legalblue-300 text-legalblue-900">
                Visit Forum
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentForumTopics.map(topic => (
              <ForumTopicCard key={topic.id} topic={topic} />
            ))}
          </div>
          
          {isAuthenticated && (
            <div className="mt-8 text-center">
              <Link to="/forum/new">
                <Button className="bg-legalblue-900 hover:bg-legalblue-700">
                  Create New Topic
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-legalgold-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4 text-legalblue-900">Make a Difference Today</h2>
            <p className="text-xl mb-8 text-gray-700">
              Your contribution can help provide financial security to families of lawyers who have passed away.
            </p>
            <Link to={isAuthenticated ? "/donate" : "/login"}>
              <Button size="lg" className="bg-legalgold-500 hover:bg-legalgold-600 text-black">
                {isAuthenticated ? "Make a Donation" : "Login to Donate"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
