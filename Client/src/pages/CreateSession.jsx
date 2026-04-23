import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createSession } from '../store/sessionSlice';
import SessionForm from '../components/Sessions/SessionForm';
import AccountList from '../components/Sessions/AccountList';
import AccountModal from '../components/Sessions/AccountModal';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';

const CreateSession = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.sessions);
  
  const [accounts, setAccounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: '' }
  });

  const handleAddAccount = (accountData) => {
    setAccounts([...accounts, accountData]);
  };

  const handleRemoveAccount = (indexToRemove) => {
    setAccounts(accounts.filter((_, idx) => idx !== indexToRemove));
  };

  const onSubmit = async (data) => {
    if (accounts.length === 0) {
      toast.error('You must add at least one account to create a session.');
      return;
    }

    const payload = {
      name: data.name,
      accounts: accounts
    };

    try {
      const resultAction = await dispatch(createSession(payload));
      if (createSession.fulfilled.match(resultAction)) {
        toast.success('Session and accounts created successfully!');
        navigate('/sessions');
      } else {
        toast.error(resultAction.payload || 'Failed to create session');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6 md:p-12 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-2xl relative z-10">
        <Link to="/sessions" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <FiArrowLeft /> Back to Sessions
        </Link>
        
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create New Session</h1>
            <p className="text-gray-400">Define a new hedge trading session and add your trading accounts.</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <SessionForm register={register} errors={errors} />

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Trading Accounts</h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 rounded-lg text-sm transition-colors"
                >
                  <FiPlus /> Add Account
                </button>
              </div>
              
              <AccountList 
                accounts={accounts} 
                onRemoveAccount={handleRemoveAccount} 
                isEditable={true} 
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Create Session'}
            </button>
          </form>
        </div>
      </div>

      <AccountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddAccount} 
      />
    </div>
  );
};

export default CreateSession;
