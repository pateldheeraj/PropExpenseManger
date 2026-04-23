import React from 'react';
import AccountCard from './AccountCard';

const AccountList = ({ accounts, onRemoveAccount, isEditable = false }) => {
  if (!accounts || accounts.length === 0) {
    return (
      <div className="text-center py-6 bg-white/5 border border-dashed border-gray-600 rounded-xl">
        <p className="text-gray-400 text-sm">No accounts added yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {accounts.map((account, index) => (
        <AccountCard 
          key={index} 
          account={account} 
          onRemove={() => onRemoveAccount(index)} 
          isEditable={isEditable} 
        />
      ))}
    </div>
  );
};

export default AccountList;
