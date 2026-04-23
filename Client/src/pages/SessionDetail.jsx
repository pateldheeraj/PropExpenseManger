import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessionById, clearCurrentSession } from '../store/sessionSlice';
import { format } from 'date-fns';
import { FiArrowLeft } from 'react-icons/fi';
import AccountList from '../components/Sessions/AccountList';

const SessionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentSession, loading, error } = useSelector((state) => state.sessions);

  useEffect(() => {
    dispatch(fetchSessionById(id));
    return () => {
      dispatch(clearCurrentSession());
    };
  }, [dispatch, id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Completed': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Failed': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  if (loading && !currentSession) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !currentSession) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Session Not Found</h2>
        <p className="text-gray-400 mb-6">{error || "The session you're looking for doesn't exist or you don't have access."}</p>
        <Link to="/sessions" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors">
          Back to Sessions
        </Link>
      </div>
    );
  }

  const { session, accounts } = currentSession;

  return (
    <div className="min-h-screen bg-gray-950 p-6 md:p-12 text-white relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center mb-8 gap-4">
          <Link to="/sessions" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <FiArrowLeft /> Back to Sessions
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{session.name}</h1>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(session.status)}`}>
                {session.status}
              </span>
            </div>
            
            <p className="text-sm text-gray-500">
              Created on: {format(new Date(session.createdAt), 'MMMM dd, yyyy')}
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-white">Trading Accounts</h2>
          <AccountList accounts={accounts} isEditable={false} />
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;
