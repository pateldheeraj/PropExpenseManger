import React from 'react';
import { IoBarChart, IoTrendingDown, IoTrendingUp } from 'react-icons/io5';

const SessionRow = ({ name, id, dateRange, performance, profit, status }) => {
  const isPositive = profit.startsWith('+');
  
  return (
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors rounded-xl group">
      <div className="flex items-center gap-4 flex-1">
        <div className={`p-3 rounded-lg ${isPositive ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-red-500'}`}>
          {isPositive ? <IoBarChart size={20} /> : <IoTrendingDown size={20} />}
        </div>
        <div>
          <h4 className="font-semibold text-slate-800">{name}</h4>
          <p className="text-xs text-gray-400">Session ID: {id}</p>
        </div>
      </div>
      
      <div className="hidden md:block flex-1">
        <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Date Range</p>
        <p className="text-sm font-medium text-slate-600">{dateRange}</p>
      </div>

      <div className="hidden lg:block flex-1">
        <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter mb-1">Performance Trend</p>
        <div className="flex items-end gap-0.5 h-6">
          {performance.map((val, i) => (
            <div 
              key={i} 
              className={`w-1 rounded-full ${isPositive ? 'bg-blue-500' : 'bg-red-400'}`} 
              style={{ height: `${val}%` }}
            />
          ))}
        </div>
      </div>

      <div className="text-right flex-1">
        <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Net Profit</p>
        <p className={`text-lg font-bold ${isPositive ? 'text-slate-800' : 'text-red-500'}`}>{profit}</p>
      </div>

      <div className="ml-6 hidden sm:block">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          status === 'COMPLETED' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default SessionRow;
