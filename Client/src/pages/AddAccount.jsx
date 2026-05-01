import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAccountToSession } from '../store/sessionSlice';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiInfo } from 'react-icons/fi';

const AddAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      propfirmName: '',
      accountPhase: 'Phase 1',
      startingBalance: 0,
      drawdown: 0,
      target: 0,
      currentPnL: 0
    }
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(addAccountToSession({ 
        sessionId: id, 
        accountData: {
          ...data,
          startingBalance: Number(data.startingBalance),
          drawdown: Number(data.drawdown),
          target: Number(data.target)
        } 
      })).unwrap();
      
      toast.success('Account initialized successfully!');
      navigate(`/sessions/${id}`);
    } catch (error) {
      toast.error(error || 'Failed to initialize account');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto">
        {/* Header & Back Button */}
        <Link to={`/sessions/${id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-8">
          <FiArrowLeft /> Back to Session
        </Link>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-12 border border-slate-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Prop Firm Name */}
            <div>
              <label className="block text-xs font-bold text-slate-500 tracking-widest uppercase mb-3">
                Prop Firm Name
              </label>
              <input
                type="text"
                {...register('propfirmName', { required: 'Prop firm name is required' })}
                placeholder="e.g. FTMO, Apex Trader Funding"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 placeholder:text-slate-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg"
              />
              {errors.propfirmName && <p className="text-red-500 text-xs mt-2 font-medium">{errors.propfirmName.message}</p>}
            </div>

            {/* Grid for Drawdown and Target */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold text-slate-500 tracking-widest uppercase mb-3">
                  Maximum Drawdown
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
                  <input
                    type="number"
                    step="0.01"
                    {...register('drawdown', { required: 'Required', min: 0 })}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg text-right"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-slate-400">Hard breach threshold</span>
                  {errors.drawdown && <span className="text-red-500 text-xs font-medium">! Required</span>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 tracking-widest uppercase mb-3">
                  Profit Target
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
                  <input
                    type="number"
                    step="0.01"
                    {...register('target', { required: 'Required', min: 0 })}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg text-right"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">Account milestone goal</p>
                {errors.target && <p className="text-red-500 text-xs mt-1 font-medium">{errors.target.message}</p>}
              </div>
            </div>

            {/* Starting Balance (Added based on spec) */}
            <div>
              <label className="block text-xs font-bold text-slate-500 tracking-widest uppercase mb-3">
                Starting Balance
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
                <input
                  type="number"
                  step="0.01"
                  {...register('startingBalance', { required: 'Required', min: 0 })}
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg text-right"
                />
              </div>
            </div>

            {/* Current Profit & Loss Section */}
            <div>
              <label className="block text-xs font-bold text-slate-500 tracking-widest uppercase mb-3">
                Current Profit & Loss
              </label>
              <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-blue-50">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Active Balance Shift</h4>
                    <p className="text-xs text-slate-500">Enter net performance relative to initial balance</p>
                  </div>
                </div>
                <div className="bg-white px-6 py-4 rounded-xl border border-blue-50 shadow-sm min-w-[140px] text-right">
                  <span className="text-slate-400 mr-4">$</span>
                  <span className="text-2xl font-bold text-slate-800">0.00</span>
                </div>
              </div>
            </div>

            {/* Feedback Box */}
            <div className="bg-blue-50/30 rounded-2xl p-6 border border-blue-100/50 flex items-start gap-4">
              <div className="mt-1">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <FiInfo className="text-white text-xs" />
                </div>
              </div>
              <p className="text-sm text-blue-800/80 leading-relaxed font-medium">
                Configuration data looks solid. The Fiscal Architect will use these parameters to generate your 30-day spending trends and equity curves.
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col md:flex-row items-center gap-6 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-70"
              >
                {isSubmitting ? 'Initializing...' : 'Initialize Account'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/sessions/${id}`)}
                className="text-slate-500 font-bold hover:text-slate-800 transition-colors py-4 px-6"
              >
                Discard Draft
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
