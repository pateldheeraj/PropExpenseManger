import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authStart, authSuccess, authFailure } from '../store/authSlice';
import { loginAPI } from '../common/auth.api';
import AuthForm from '../components/Auth/AuthForm';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleLogin = async (data) => {
    try {
      dispatch(authStart());
      const response = await loginAPI({
        email: data.email,
        password: data.password,
      });

      if (response.status === 'success') {
        dispatch(authSuccess(response.data));
        toast.success(response.message || 'Logged in successfully!');
        navigate('/');
      } else {
        dispatch(authFailure(response.message));
        toast.error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Invalid email or password';
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
      <AuthForm type="login" onSubmit={handleLogin} isLoading={loading} />
    </div>
  );
};

export default Login;
