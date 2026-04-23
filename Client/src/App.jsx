import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Sessions from './pages/Sessions';
import CreateSession from './pages/CreateSession';
import SessionDetail from './pages/SessionDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/sessions/new" element={<CreateSession />} />
          <Route path="/sessions/:id" element={<SessionDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
