
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-legalblue-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-xl font-bold text-legalgold-500 mb-4">LegalAid Connect</h3>
            <p className="text-gray-300 mb-4">
              Supporting the legal community and their families in times of need.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-legalgold-500">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-legalgold-500">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-legalgold-500">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.7,3H4.3C3.582,3,3,3.582,3,4.3v15.4C3,20.418,3.582,21,4.3,21h15.4c0.718,0,1.3-0.582,1.3-1.3V4.3 C21,3.582,20.418,3,19.7,3z M8.339,18.338H5.667v-8.59h2.672V18.338z M7.004,8.574c-0.857,0-1.549-0.694-1.549-1.548 c0-0.855,0.691-1.548,1.549-1.548c0.854,0,1.547,0.694,1.547,1.548C8.551,7.881,7.858,8.574,7.004,8.574z M18.339,18.338h-2.669 v-4.177c0-0.996-0.017-2.278-1.387-2.278c-1.389,0-1.601,1.086-1.601,2.206v4.249h-2.667v-8.59h2.559v1.174h0.037 c0.356-0.675,1.227-1.387,2.526-1.387c2.703,0,3.203,1.779,3.203,4.092V18.338z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-legalgold-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-legalgold-500 transition-colors">About</Link></li>
              <li><Link to="/support-requests" className="text-gray-300 hover:text-legalgold-500 transition-colors">Support Requests</Link></li>
              <li><Link to="/forum" className="text-gray-300 hover:text-legalgold-500 transition-colors">Forum</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-legalgold-500 transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-legalgold-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-legalgold-500 transition-colors">Resources</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-legalgold-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-legalgold-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-legalgold-500 transition-colors">Cookies Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} LegalAid Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
