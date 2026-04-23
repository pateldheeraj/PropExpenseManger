import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSessions } from '../store/sessionSlice';
import SessionCard from '../components/Sessions/SessionCard';
import { FiPlus } from 'react-icons/fi';

const Sessions = () => {
  const dispatch = useDispatch();
  const { sessions, loading } = useSelector((state) => state.sessions);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-950 p-6 md:p-12 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Your Sessions
            </h1>
            <p className="text-gray-400 mt-1">Manage your prop trading hedge sessions</p>
          </div>
          <Link
            to="/sessions/new"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
          >
            <FiPlus /> New Session
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : sessions && sessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <SessionCard key={session._id} session={session} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
            <p className="text-gray-400 mb-4">You don't have any active sessions yet.</p>
            <Link
              to="/sessions/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20"
            >
              <FiPlus /> Create Your First Session
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
