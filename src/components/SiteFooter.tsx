
import React from 'react';
import { Link } from 'react-router-dom';

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6 px-4 mt-12">
      <div className="container max-w-5xl mx-auto text-center">
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600 text-sm">
            Home
          </Link>
          <Link to="/data-access" className="text-gray-600 hover:text-blue-600 text-sm">
            Data Access
          </Link>
          <Link to="/resources" className="text-gray-600 hover:text-blue-600 text-sm">
            Resources
          </Link>
          <Link to="/meltdown-tracking" className="text-gray-600 hover:text-blue-600 text-sm">
            Meltdown Tracking
          </Link>
        </div>
        <p className="text-xs text-gray-500">
          &copy; {currentYear} Emotional Safety App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
