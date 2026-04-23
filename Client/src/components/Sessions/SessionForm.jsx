import React from 'react';

const SessionForm = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Session Name</label>
        <input
          type="text"
          {...register('name', { required: 'Session name is required' })}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white placeholder-gray-500"
          placeholder="e.g., Q3 Aggressive Strategy"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
      </div>
    </div>
  );
};

export default SessionForm;
