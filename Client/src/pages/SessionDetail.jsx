import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessionById, clearCurrentSession, deleteAccount } from '../store/sessionSlice';
import { format } from 'date-fns';
import { FiArrowLeft, FiPlus, FiMoreHorizontal, FiChevronRight, FiDatabase, FiDollarSign, FiActivity, FiTrendingUp } from 'react-icons/fi';
import AccountCard from '../components/Sessions/AccountCard';
import Swal from 'sweetalert2';

const SessionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentSession, loading, error } = useSelector((state) => state.sessions);

  useEffect(() => {
    dispatch(fetchSessionById(id));
    return () => {
      dispatch(clearCurrentSession());
    };
  }, [dispatch, id]);

  const handleDeleteAccount = async (accountId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteAccount(accountId)).unwrap();
        Swal.fire('Deleted!', 'Account has been removed.', 'success');
      } catch (error) {
        Swal.fire('Error!', error || 'Failed to delete account', 'error');
      }
    }
  };

  if (loading && !currentSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !currentSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-12 rounded-3xl shadow-xl shadow-slate-200 text-center max-w-md">
          <h2 className="text-3xl font-black text-slate-800 mb-4">Session Not Found</h2>
          <p className="text-slate-500 mb-8">{error || "The session you're looking for doesn't exist or you don't have access."}</p>
          <Link to="/sessions" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-100">
            <FiArrowLeft /> Back to Sessions
          </Link>
        </div>
      </div>
    );
  }

  const { session, accounts } = currentSession;

  // Aggregate Metrics
  const activeAccountsCount = accounts.length;
  const totalBalance = accounts.reduce((acc, curr) => acc + curr.startingBalance, 0);
  const totalPnL = accounts.reduce((acc, curr) => acc + (curr.currentPnL || 0), 0);
  
  const metrics = [
    { label: 'Active Accounts', value: activeAccountsCount.toString().padStart(2, '0'), icon: <FiActivity />, color: 'text-slate-800' },
    { label: 'Total Payout', value: '$42,500.00', icon: <FiDollarSign />, color: 'text-blue-600' }, // Mock from design
    { label: 'Account Costs', value: '$3,200.00', icon: <FiDatabase />, color: 'text-slate-800' }, // Mock from design
    { label: 'Live Account Loss', value: '-$1,420.50', icon: <FiActivity />, color: 'text-red-500' }, // Mock from design
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-20">
      
      {/* Top Navbar / Breadcrumbs */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">
              <Link to="/sessions" className="hover:text-blue-600">Prop Accounts</Link>
              <FiChevronRight />
              <span className="text-blue-600">{session.name}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Session Detail</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-4 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-2xl transition-all">
              <FiPlus /> Add Payout
            </button>
            <Link 
              to={`/sessions/${id}/add-account`}
              className="flex items-center gap-2 px-6 py-4 bg-[#0047AB] hover:bg-blue-800 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/20"
            >
              <FiPlus /> Add Account
            </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Metric Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {metrics.map((metric, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 block mb-6">{metric.label}</span>
                <div className={`text-3xl font-black ${metric.color}`}>{metric.value}</div>
              </div>
            ))}
          </div>

          {/* Net Profit Card */}
          <div className="bg-[#0047AB] p-8 rounded-3xl shadow-xl shadow-blue-900/20 relative overflow-hidden">
             <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
             <span className="text-[10px] font-bold tracking-widest uppercase text-white/60 block mb-6">Net Profit/Loss</span>
             <div className="text-4xl font-black text-white mb-2">
               {totalPnL >= 0 ? '+' : '-'}${Math.abs(totalPnL).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
             </div>
             <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Aggregated Results</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Accounts Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Prop Firm Accounts</h3>
                <button className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all">
                  View All Accounts <FiChevronRight />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                {accounts.map((acc) => (
                  <AccountCard 
                    key={acc._id} 
                    account={acc} 
                    onDelete={handleDeleteAccount}
                    onEdit={(acc) => navigate(`/sessions/${id}/accounts/${acc._id}/edit`)} // Placeholder route
                  />
                ))}
                {accounts.length === 0 && (
                   <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                     <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                       <FiActivity size={32} />
                     </div>
                     <p className="text-slate-500 font-medium">No accounts linked to this session yet.</p>
                   </div>
                )}
              </div>
            </section>

            {/* Trade Ledger Placeholder */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Trade Ledger</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl text-sm">
                  <FiPlus /> Add Trade
                </button>
              </div>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trade #</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prop PnL</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live PnL</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-50 group hover:bg-slate-50/30 transition-colors">
                      <td className="px-8 py-6 font-bold text-slate-500 text-sm">#TR-8821</td>
                      <td className="px-8 py-6 font-bold text-slate-800 text-sm">FTMO #1</td>
                      <td className="px-8 py-6 font-bold text-blue-600 text-sm">+$1,240.00</td>
                      <td className="px-8 py-6 font-bold text-blue-600 text-sm">+$412.00</td>
                      <td className="px-8 py-6 text-slate-400 text-xs">XAUUSD Long - Fibonacci Retracement</td>
                    </tr>
                    {/* Add more mock rows to match design */}
                    <tr className="border-b border-slate-50 group hover:bg-slate-50/30 transition-colors">
                      <td className="px-8 py-6 font-bold text-slate-500 text-sm">#TR-8820</td>
                      <td className="px-8 py-6 font-bold text-slate-800 text-sm">MyForexFunds</td>
                      <td className="px-8 py-6 font-bold text-red-500 text-sm">-$840.00</td>
                      <td className="px-8 py-6 font-bold text-red-500 text-sm">-$210.00</td>
                      <td className="px-8 py-6 text-slate-400 text-xs">EURUSD Short - News spike volatility</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-lg font-black text-slate-800 tracking-tight">Recent Payouts</h4>
                <button className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-100">
                  <FiPlus size={14} />
                </button>
              </div>
              
              <div className="space-y-6">
                {[
                  { date: 'Aug 2023 Payout', amount: '+$14,200.00', status: 'Completed', time: '2 days ago' },
                  { date: 'July 2023 Payout', amount: '+$12,850.00', status: 'Completed', time: '32 days ago' },
                  { date: 'June 2023 Payout', amount: '+$15,450.00', status: 'Completed', time: '64 days ago' },
                ].map((payout, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <FiDollarSign />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-800">{payout.date}</h5>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{payout.status} • {payout.time}</p>
                      </div>
                    </div>
                    <div className="text-sm font-black text-blue-600">{payout.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Float Button Placeholder */}
            <div className="fixed bottom-12 right-12 z-50">
              <button className="w-16 h-16 bg-[#0047AB] text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/40 hover:scale-110 transition-transform">
                 <FiActivity size={24} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SessionDetail;
