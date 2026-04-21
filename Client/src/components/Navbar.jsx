import React from 'react';
import { IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-slate-800">Prop Expense Manager</h1>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-blue-600 font-medium relative after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-[2px] after:bg-blue-600">Dashboard</a>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-sm text-gray-500 hidden sm:block">
          Session: Q3 2023
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <IoNotificationsOutline size={22} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <IoSettingsOutline size={22} />
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="User Profile" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
