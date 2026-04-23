import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const AccountCard = ({ account, onRemove, isEditable = false }) => {
  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl relative group">
      {isEditable && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-3 right-3 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FiTrash2 size={18} />
        </button>
      )}
      
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-semibold text-white truncate pr-2">{account.propfirmName}</h4>
        <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded border border-indigo-400/20">
          {account.accountPhase}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <div>
          <span className="text-gray-500 block text-xs">Balance</span>
          <span className="text-gray-200">${account.startingBalance?.toLocaleString() || 0}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-xs">Drawdown</span>
          <span className="text-red-300">-${account.drawdown?.toLocaleString() || 0}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-xs">Profit Target</span>
          <span className="text-green-300">${account.target?.toLocaleString() || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
