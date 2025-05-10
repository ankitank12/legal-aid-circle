
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: "Rajiv Dhawan",
      position: "Director",
      image: "",
      bio: "Rajiv is a senior advocate with over 25 years of experience in corporate law. He founded LegalAid Connect to create a safety net for lawyers and their families."
    },
    {
      name: "Priya Singh",
      position: "Secretary",
      image: "",
      bio: "Priya specializes in family law and has been instrumental in organizing community outreach programs for legal professionals."
    },
    {
      name: "Vikram Malhotra",
      position: "Treasurer",
      image: "",
      bio: "Vikram brings his expertise in financial law to ensure transparent fund management and appropriate distribution to beneficiaries."
    },
    {
      name: "Anita Gupta",
      position: "Community Manager",
      image: "",
      bio: "Anita oversees the forum discussions and ensures that the platform remains a respectful and productive space for all members."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Foundation Established",
      description: "The platform was conceptualized following the loss of several legal professionals during the pandemic."
    },
    {
      year: "2021",
      title: "First Support Campaign",
      description: "Successfully raised ₹15 lakhs for families of five lawyers who passed away during the second wave."
    },
    {
      year: "2022",
      title: "Forum Launch",
      description: "Expanded the platform to include a community forum for professional development and support."
    },
    {
      year: "2023",
      title: "100+ Families Supported",
      description: "Reached the milestone of supporting over 100 families through financial assistance programs."
    }
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-legalblue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-serif font-bold mb-6">About LegalAid Connect</h1>
            <p className="text-xl mb-8">
              Creating a supportive network for legal professionals and providing security to their families in times of need.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6 text-legalblue-900">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                To create a self-sustaining community of legal professionals that provides financial security and support to families of lawyers who have passed away or are facing severe hardships.
              </p>
              <p className="text-lg text-gray-700">
                We believe that by standing together, we can ensure that no lawyer's family is left vulnerable during difficult times. Our platform facilitates direct support from the legal fraternity itself, creating a closed ecosystem of mutual aid and professional solidarity.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6 text-legalblue-900">Our Vision</h2>
              <p className="text-lg text-gray-700 mb-6">
                To establish the most comprehensive support network for legal professionals across India, where every member feels secure knowing their families will be supported by their colleagues if anything happens to them.
              </p>
              <p className="text-lg text-gray-700">
                We envision expanding beyond financial assistance to include mentorship programs, professional development resources, and mental health support for all members of the legal community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center text-legalblue-900">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-legalblue-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="bg-legalblue-100 rounded-full p-3 inline-block">
                    <svg className="w-10 h-10 text-legalblue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-bold mt-4 mb-2">Emergency Financial Support</h3>
                  <p className="text-gray-600">
                    Quick financial assistance for families of lawyers who have passed away, ensuring immediate needs are met before long-term support can be arranged.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-legalblue-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="bg-legalblue-100 rounded-full p-3 inline-block">
                    <svg className="w-10 h-10 text-legalblue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-bold mt-4 mb-2">Professional Community</h3>
                  <p className="text-gray-600">
                    A dedicated forum for lawyers to discuss legal issues, share resources, and build a strong professional network based on mutual support.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-legalblue-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="bg-legalblue-100 rounded-full p-3 inline-block">
                    <svg className="w-10 h-10 text-legalblue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-bold mt-4 mb-2">Transparent Fund Management</h3>
                  <p className="text-gray-600">
                    Complete transparency in how donations are collected and distributed, with regular updates to donors about the impact of their contributions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center text-legalblue-900">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-legalblue-200 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="text-lg bg-legalblue-800 text-white">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-legalgold-600 mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center text-legalblue-900">Our Journey</h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-legalblue-200 hidden md:block"></div>
            
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 text-center">
                    <div className="bg-white p-6 rounded-lg shadow border border-legalblue-100">
                      <h3 className="text-xl font-bold text-legalblue-900 mb-1">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <div className="relative">
                      <div className="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-legalblue-900 text-white flex items-center justify-center font-bold text-lg z-10">
                        {milestone.year}
                      </div>
                      <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-legalblue-200"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-legalblue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Join Our Community Today</h2>
            <p className="text-xl mb-8">
              Become part of a supportive network that ensures no lawyer's family is left unsupported in times of need.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-legalgold-500 hover:bg-legalgold-600 text-black">
                  Register Now
                </Button>
              </Link>
              <Link to="/donate">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-legalblue-900">
                  Make a Donation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
