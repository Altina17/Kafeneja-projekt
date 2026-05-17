import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Email ose password i gabuar!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-96 border border-gray-700">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">☕</div>
          <h1 className="text-3xl font-bold text-white">Kafeneja</h1>
          <p className="text-gray-400 text-sm mt-1">Sistemi i Menaxhimit</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-2 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input
              type="email"
              placeholder="email@kafeneja.com"
              className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-1">Fjalëkalimi</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-200"
          >
            Kyçu →
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">© 2026 Kafeneja</p>
      </div>
    </div>
  );
};

export default Login;