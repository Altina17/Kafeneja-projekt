import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      setSuccess('Useri u krijua me sukses!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError('Gabim gjatë regjistrimit!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Regjistrohu</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Emri"
            className="w-full border p-2 mb-4 rounded"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 mb-4 rounded"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
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