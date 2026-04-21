import React from 'react';
import { IoAdd, IoWalletOutline, IoCalendarOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import SessionRow from '../components/SessionRow';
import CategoryAllocation from '../components/CategoryAllocation';
import StrategicAdvisory from '../components/StrategicAdvisory';

const Dashboard = () => {
  const sessions = [
    {
      name: "Apex High-Volatility Q3",
      id: "#AX-2023-09",
      dateRange: "Sep 01 — Sep 15",
      performance: [40, 60, 45, 80, 70, 95],
      profit: "+$24,402.00",
      status: "COMPLETED"
    },
    {
      name: "FTMO Conservative Scalp",
      id: "#FM-2023-08",
      dateRange: "Aug 12 — Aug 28",
      performance: [80, 70, 50, 40, 30, 35],
      profit: "-$4,210.50",
      status: "SETTLED"
    },
    {
      name: "MFF Growth Accelerator",
      id: "#MF-2023-08",
      dateRange: "Jul 30 — Aug 10",
      performance: [30, 40, 35, 60, 75, 90],
      profit: "+$82,105.00",
      status: "COMPLETED"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-8 py-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-2">Trading Sessions</h2>
            <p className="text-gray-400 font-medium">Architecting your fiscal strategy through precision tracking.</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 group">
            <IoAdd size={24} className="group-hover:rotate-90 transition-transform" />
            <span>Create New Session</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            title="Total Net Profit" 
            value="$142,850.20" 
            subtext="VS LAST PERIOD" 
            trend="+12.4%" 
            icon={IoWalletOutline} 
            color="blue"
          />
          <StatCard 
            title="Active Sessions" 
            value="04" 
            subtext="ACROSS 2 PROP FIRMS" 
            icon={IoCalendarOutline} 
            color="blue"
          />
          <StatCard 
            title="Portfolio Drawdown" 
            value="2.1%" 
            subtext="HEALTHY RISK LEVELS" 
            icon={IoShieldCheckmarkOutline} 
            color="orange"
          />
        </div>

        {/* Sessions Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden mb-10">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">Past Sessions</h3>
            <button className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
              View Archive <span className="text-lg">→</span>
            </button>
          </div>
          
          <div className="p-4">
            <div className="flex flex-col">
              {sessions.map((session, index) => (
                <React.Fragment key={index}>
                  <SessionRow {...session} />
                  {index < sessions.length - 1 && <div className="h-[1px] bg-gray-50 my-1 mx-4" />}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-50 py-4 text-center">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
              Showing 3 of 42 historical sessions
            </p>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryAllocation />
          <StrategicAdvisory />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
