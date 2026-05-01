import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const AccountCard = ({ account, onEdit, onDelete, isEditable = true }) => {
  // Mock PnL for visual representation as seen in design reference
  // In a real scenario, this would come from a trade history/aggregation
  const currentPnL = account.currentPnL || 0; 
  const pnlPercentage = (currentPnL / account.startingBalance) * 100;
  
  // Calculate progress bar widths
  // If profit: blue bar towards target
  // If loss: red bar towards drawdown
  const targetProgress = Math.min(Math.max((currentPnL / account.target) * 100, 0), 100);
  const drawdownProgress = Math.min(Math.max((Math.abs(Math.min(currentPnL, 0)) / account.drawdown) * 100, 0), 100);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-slate-50 rounded-full blur-2xl group-hover:bg-blue-50 transition-colors" />

      {/* Action Buttons (Hover) */}
      {isEditable && (
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button 
            onClick={() => onEdit && onEdit(account)}
            className="p-2 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors border border-slate-100"
          >
            <FiEdit size={16} />
          </button>
          <button 
            onClick={() => onDelete && onDelete(account._id)}
            className="p-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors border border-slate-100"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h4 className="text-xl font-bold text-slate-800 leading-tight">{account.propfirmName}</h4>
          <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">ID: {account._id.slice(-8).toUpperCase()}</p>
        </div>
        <span className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border ${
          account.accountPhase === 'Funded' 
            ? 'text-orange-600 bg-orange-50 border-orange-100' 
            : 'text-blue-600 bg-blue-50 border-blue-100'
        }`}>
          {account.accountPhase}
        </span>
      </div>

      {/* PnL Display */}
      <div className="mb-6">
        <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Current PnL</span>
        <div className={`text-3xl font-black mt-1 ${currentPnL >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
          {currentPnL >= 0 ? '+' : '-'}${Math.abs(currentPnL).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        {/* Drawdown Progress */}
        <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="absolute right-1/2 left-0 bg-red-500 h-full rounded-full transition-all duration-1000 origin-right"
            style={{ width: `${drawdownProgress / 2}%`, transform: 'translateX(100%)' }}
          />
          <div 
            className="absolute left-1/2 right-0 bg-blue-500 h-full rounded-full transition-all duration-1000"
            style={{ width: `${targetProgress / 2}%` }}
          />
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white z-10" />
        </div>

        <div className="flex justify-between items-end">
          <div className="text-left">
            <span className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase">Max Drawdown</span>
            <span className="text-xs font-bold text-red-500">-${account.drawdown.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase">Profit Target</span>
            <span className="text-xs font-bold text-slate-800">${account.target.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
