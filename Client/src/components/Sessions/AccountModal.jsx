import React from 'react';
import { useForm } from 'react-hook-form';

const AccountModal = ({ isOpen, onClose, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      propfirmName: '',
      accountPhase: 'Phase 1',
      startingBalance: '',
      drawdown: '',
      target: ''
    }
  });

  const onSubmit = (data) => {
    onSave({
      propfirmName: data.propfirmName,
      accountPhase: data.accountPhase,
      startingBalance: Number(data.startingBalance),
      drawdown: Number(data.drawdown),
      target: Number(data.target)
    });
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Add Account</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Propfirm Name</label>
            <input
              type="text"
              {...register('propfirmName', { required: 'Propfirm name is required' })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. MyForexFunds"
            />
            {errors.propfirmName && <p className="text-red-400 text-xs mt-1">{errors.propfirmName.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Account Phase</label>
            <select
              {...register('accountPhase', { required: 'Required' })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="Phase 1">Phase 1</option>
              <option value="Phase 2">Phase 2</option>
              <option value="Funded">Funded</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Balance</label>
            <input
              type="number"
              {...register('startingBalance', { required: 'Required', min: 0 })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.startingBalance && <p className="text-red-400 text-xs mt-1">{errors.startingBalance.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Profit Target</label>
              <input
                type="number"
                {...register('target', { required: 'Required', min: 0 })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.target && <p className="text-red-400 text-xs mt-1">{errors.target.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Drawdown</label>
              <input
                type="number"
                {...register('drawdown', { required: 'Required', min: 0 })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.drawdown && <p className="text-red-400 text-xs mt-1">{errors.drawdown.message}</p>}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => { reset(); onClose(); }}
              className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Save Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountModal;
