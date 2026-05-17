import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', surname: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Emri është i detyrueshëm!';
    else if (form.name.length < 2) newErrors.name = 'Emri duhet të ketë minimum 2 karaktere!';
    if (!form.surname) newErrors.surname = 'Mbiemri është i detyrueshëm!';
    else if (form.surname.length < 2) newErrors.surname = 'Mbiemri duhet të ketë minimum 2 karaktere!';
    if (!form.email) newErrors.email = 'Email është i detyrueshëm!';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email duhet të jetë valid (p.sh. emri@gmail.com)!';
    if (!form.password) newErrors.password = 'Fjalëkalimi është i detyrueshëm!';
    else if (form.password.length < 8) newErrors.password = 'Fjalëkalimi duhet të ketë minimum 8 karaktere!';
    else if (!/[A-Z]/.test(form.password)) newErrors.password = 'Duhet të paktën 1 shkronjë e madhe!';
    else if (!/[a-z]/.test(form.password)) newErrors.password = 'Duhet të paktën 1 shkronjë e vogël!';
    else if (!/[0-9]/.test(form.password)) newErrors.password = 'Duhet të paktën 1 numër!';
    else if (!/[!@#$%^&*]/.test(form.password)) newErrors.password = 'Duhet të paktën 1 shenjë (!@#$%^&*)!';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Konfirmo fjalëkalimin!';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Fjalëkalimet nuk përputhen!';
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
      await API.post('/auth/register', {
        name: form.name + ' ' + form.surname,
        email: form.email,
        password: form.password,
        role: 'admin'
      });
      setSuccess('Useri u krijua me sukses!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setErrors({ general: 'Gabim gjatë regjistrimit! Email mund të ekzistojë.' });
    }
  };

  const handleChange = (field, value) => {
    setForm({...form, [field]: value});
    setErrors({...errors, [field]: ''});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 py-8">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-96 border border-gray-700">
        
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">☕</div>
          <h1 className="text-3xl font-bold text-white">Kafeneja</h1>
          <p className="text-gray-400 text-sm mt-1">Krijo llogari të re</p>
        </div>

        {errors.general && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-2 rounded-lg mb-4 text-sm text-center">
            {errors.general}
          </div>
        )}
        {success && (
          <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-2 rounded-lg mb-4 text-sm text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-400 mb-1">Emri</label>
            <input
              type="text"
              placeholder="Emri"
              autoComplete="off"
              className={`w-full bg-gray-700 border text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-400 mb-1">Mbiemri</label>
            <input
              type="text"
              placeholder="Mbiemri"
              autoComplete="off"
              className={`w-full bg-gray-700 border text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.surname ? 'border-red-500' : 'border-gray-600'}`}
              value={form.surname}
              onChange={(e) => handleChange('surname', e.target.value)}
            />
            {errors.surname && <p className="text-red-400 text-xs mt-1">{errors.surname}</p>}
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input
              type="email"
              placeholder="emri@gmail.com"
              autoComplete="off"
              className={`w-full bg-gray-700 border text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-400 mb-1">Fjalëkalimi</label>
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              className={`w-full bg-gray-700 border text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.password ? 'border-red-500' : 'border-gray-600'}`}
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-1">Konfirmo Fjalëkalimin</label>
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              className={`w-full bg-gray-700 border text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'}`}
              value={form.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
            />
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-200"
          >
            Regjistrohu →
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Ke llogari?{' '}
          <span onClick={() => navigate('/')} className="text-blue-400 cursor-pointer hover:underline">
            Kyçu
          </span>
        </p>

        <p className="text-center text-gray-600 text-xs mt-3">© 2025 Kafeneja</p>
      </div>
    </div>
  );
};

export default Register;