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
    if (!form.surname) newErrors.surname = 'Mbiemri është i detyrueshëm!';
    if (!form.email) newErrors.email = 'Email është i detyrueshëm!';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email nuk është valid!';
    if (!form.password) newErrors.password = 'Fjalëkalimi është i detyrueshëm!';
    else if (form.password.length < 6) newErrors.password = 'Fjalëkalimi duhet të ketë minimum 6 karaktere!';
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
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setErrors({ general: 'Gabim gjatë regjistrimit! Email mund të ekzistojë.' });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Regjistrohu</h2>
        {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Emri"
              className={`w-full border p-2 rounded ${errors.name ? 'border-red-500' : ''}`}
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Mbiemri"
              className={`w-full border p-2 rounded ${errors.surname ? 'border-red-500' : ''}`}
              value={form.surname}
              onChange={(e) => setForm({...form, surname: e.target.value})}
            />
            {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className={`w-full border p-2 rounded ${errors.email ? 'border-red-500' : ''}`}
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Fjalëkalimi"
              className={`w-full border p-2 rounded ${errors.password ? 'border-red-500' : ''}`}
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Konfirmo fjalëkalimin"
              className={`w-full border p-2 rounded ${errors.confirmPassword ? 'border-red-500' : ''}`}
              value={form.confirmPassword}
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Regjistrohu
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Ke llogari? <span onClick={() => navigate('/')} className="text-blue-500 cursor-pointer">Kyçu</span>
        </p>
      </div>
    </div>
  );
};

export default Register;