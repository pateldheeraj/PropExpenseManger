import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const SessionCard = ({ session }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Completed': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Failed': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="relative overflow-hidden bg-white/5 dark:bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-white/20 hover:-translate-y-1 flex flex-col">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold text-white truncate pr-4">{session.name}</h3>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(session.status)}`}>
            {session.status}
          </span>
        </div>
        
        <div className="mt-auto">
          <div className="text-xs text-gray-500 mb-4">
            <span>Created: {format(new Date(session.createdAt), 'MMM dd, yyyy')}</span>
          </div>
          
          <Link
            to={`/sessions/${session._id}`}
            className="block w-full py-2 px-4 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 text-center rounded-xl transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
