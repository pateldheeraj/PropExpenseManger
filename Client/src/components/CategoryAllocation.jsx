import React from 'react';
import { IoSync } from 'react-icons/io5';

const CategoryAllocation = () => {
  const categories = [
    { name: "Prop Challenge Fees", amount: "$1,200.00", percentage: 75, color: "bg-blue-600" },
    { name: "Platform Subscriptions", amount: "$450.00", percentage: 40, color: "bg-blue-300" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 h-full">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Category Allocation</h4>
        <button className="text-gray-400 hover:text-blue-500 transition-colors">
          <IoSync size={18} />
        </button>
      </div>
      
      <div className="space-y-6">
        {categories.map((cat, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-600">{cat.name}</span>
              <span className="text-sm font-bold text-slate-800">{cat.amount}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className={`${cat.color} h-full rounded-full transition-all duration-500`} 
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryAllocation;
