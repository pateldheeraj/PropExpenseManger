import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authStart, authSuccess, authFailure } from '../store/authSlice';
import { registerAPI } from '../common/auth.api';
import AuthForm from '../components/Auth/AuthForm';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleRegister = async (data) => {
    try {
      dispatch(authStart());
      const response = await registerAPI({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 'success') {
        dispatch(authSuccess(response.data));
        toast.success(response.message || 'Registration successful!');
        navigate('/');
      } else {
        dispatch(authFailure(response.message));
        toast.error(response.message || 'Registration failed');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Something went wrong during registration';
      dispatch(authFailure(errorMsg));
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <h1 className="text-center text-4xl font-extrabold text-blue-600">
          Prop Expense Manager
        </h1>
      </div>
      <AuthForm type="register" onSubmit={handleRegister} isLoading={loading} />
    </div>
  );
};

export default Register;
