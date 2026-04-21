import React from 'react';
import { IoArrowUp } from 'react-icons/io5';

const StatCard = ({ title, value, subtext, trend, icon: Icon, color = "blue" }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400 font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
        <div className="flex items-center gap-2 mt-2">
          {trend && (
            <span className={`text-xs font-bold flex items-center ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              <IoArrowUp className={trend.startsWith('+') ? '' : 'rotate-180'} />
              {trend}
            </span>
          )}
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{subtext}</span>
        </div>
      </div>
      {Icon && (
        <div className={`p-4 rounded-xl bg-${color}-50 text-${color}-500`}>
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
