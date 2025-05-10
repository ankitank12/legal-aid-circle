
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  LogIn, 
  UserPlus, 
  MessageSquare,
  Settings,
  HelpCircle,
  Home
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header = ({ isAuthenticated, onLogout }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-legalblue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-legalgold-500 font-serif text-2xl font-bold">
              <Link to="/" className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
                LegalAid Connect
              </Link>
            </div>
          </div>

          {isMobile ? (
            <div className="flex items-center">
              <button 
                onClick={toggleMobileMenu} 
                className="text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          ) : (
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-white hover:text-legalgold-300 transition-colors flex items-center">
                <Home size={18} className="mr-1" />
                Home
              </Link>
              <Link to="/support-requests" className="text-white hover:text-legalgold-300 transition-colors flex items-center">
                <HelpCircle size={18} className="mr-1" />
                Support Requests
              </Link>
              <Link to="/forum" className="text-white hover:text-legalgold-300 transition-colors flex items-center">
                <MessageSquare size={18} className="mr-1" />
                Forum
              </Link>
              <Link to="/about" className="text-white hover:text-legalgold-300 transition-colors">
                About
              </Link>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="text-white hover:text-legalgold-300 transition-colors flex items-center">
                    <User size={18} className="mr-1" />
                    Profile
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-legalgold-300 transition-colors flex items-center"
                    onClick={onLogout}
                  >
                    <LogOut size={18} className="mr-1" />
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-legalblue-900 flex items-center">
                      <LogIn size={18} className="mr-1" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-legalgold-500 hover:bg-legalgold-600 text-black flex items-center">
                      <UserPlus size={18} className="mr-1" />
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          )}
        </div>

        {/* Mobile menu */}
        {isMobile && mobileMenuOpen && (
          <div className="pt-4 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-white hover:bg-legalblue-800 hover:text-legalgold-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home size={18} className="mr-2" />
                Home
              </div>
            </Link>
            <Link 
              to="/support-requests" 
              className="block px-3 py-2 rounded-md text-white hover:bg-legalblue-800 hover:text-legalgold-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <HelpCircle size={18} className="mr-2" />
                Support Requests
              </div>
            </Link>
            <Link 
              to="/forum" 
              className="block px-3 py-2 rounded-md text-white hover:bg-legalblue-800 hover:text-legalgold-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <MessageSquare size={18} className="mr-2" />
                Forum
              </div>
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-white hover:bg-legalblue-800 hover:text-legalgold-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-white hover:bg-legalblue-800 hover:text-legalgold-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <User size={18} className="mr-2" />
                    Profile
                  </div>
                </Link>
                <button 
                  className="w-full text-left px-3 py-2 rounded-md text-white hover:bg-legalblue-800 hover:text-legalgold-300"
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <LogOut size={18} className="mr-2" />
                    Log out
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-white hover:bg-legalblue-800 hover:text-legalgold-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <LogIn size={18} className="mr-2" />
                    Login
                  </div>
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-white hover:bg-legalblue-800 hover:text-legalgold-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <UserPlus size={18} className="mr-2" />
                    Register
                  </div>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
