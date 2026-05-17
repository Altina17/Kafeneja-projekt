import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email është i detyrueshëm!';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email nuk është valid!';
    if (!password) newErrors.password = 'Fjalëkalimi është i detyrueshëm!';
    else if (password.length < 6) newErrors.password = 'Fjalëkalimi duhet të ketë minimum 6 karaktere!';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ general: 'Email ose password i gabuar!' });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-96 border border-gray-700">
        
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">☕</div>
          <h1 className="text-3xl font-bold text-white">Kafeneja</h1>
          <p className="text-gray-400 text-sm mt-1">Sistemi i Menaxhimit</p>
        </div>

        {errors.general && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-2 rounded-lg mb-4 text-sm text-center">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input
              type="email"
              placeholder="email@kafeneja.com"
              autoComplete="off"
              className={`w-full bg-gray-700 border text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-1">Fjalëkalimi</label>
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              className={`w-full bg-gray-700 border text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.password ? 'border-red-500' : 'border-gray-600'}`}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-200"
          >
            Kyçu →
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Nuk ke llogari?{' '}
          <span onClick={() => navigate('/register')} className="text-blue-400 cursor-pointer hover:underline">
            Regjistrohu
          </span>
        </p>

        <p className="text-center text-gray-600 text-xs mt-3">© 2025 Kafeneja</p>
      </div>
    </div>
  );
};

export default Login;