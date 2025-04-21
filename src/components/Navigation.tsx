import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 mr-3 shadow-sm group-hover:shadow-md transition-shadow">
                <img 
                  src="/logo.png" 
                  alt="Password Generator Logo" 
                  className="h-6 w-6 transform transition-transform group-hover:scale-110" 
                />
              </div>
              <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">getrandompassword.com</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/blog"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname.startsWith('/blog')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 