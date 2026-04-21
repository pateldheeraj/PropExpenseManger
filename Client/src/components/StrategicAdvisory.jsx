import React from 'react';

const StrategicAdvisory = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm border border-blue-100 h-full relative overflow-hidden">
      <div className="relative z-10 max-w-[60%]">
        <h4 className="text-xl font-bold text-indigo-900 mb-3">Strategic Advisory</h4>
        <p className="text-sm text-indigo-700/80 leading-relaxed mb-6">
          Your current win-rate of 68% suggests you could optimize for larger lot sizes on high-probability setups.
        </p>
        <button className="text-indigo-900 font-bold text-sm border-b-2 border-indigo-900 pb-0.5 hover:text-indigo-700 hover:border-indigo-700 transition-colors">
          Review Strategy Insights
        </button>
      </div>
      
      {/* Decorative graph element */}
      <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 80 Q 25 70, 40 75 T 70 40 T 90 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-indigo-600" />
          <path d="M10 80 Q 25 70, 40 75 T 70 40 T 90 20 L 90 100 L 10 100 Z" fill="currentColor" className="text-indigo-200" />
        </svg>
      </div>
    </div>
  );
};

export default StrategicAdvisory;
