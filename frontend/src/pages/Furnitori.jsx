import { useState, useEffect } from 'react';
import API from '../api/axios';

const Furnitori = () => {
  const [furnitoret, setFurnitoret] = useState([]);
  const [form, setForm] = useState({ emri: '', personi_kontaktit: '', telefoni: '', email: '', adresa: '', lloji_produkteve: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await API.get('/furnitoret');
    setFurnitoret(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/furnitoret/${editId}`, form);
    } else {
      await API.post('/furnitoret', form);
    }
    setForm({ emri: '', personi_kontaktit: '', telefoni: '', email: '', adresa: '', lloji_produkteve: '' });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.furnitor_id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt?')) {
      await API.delete(`/furnitoret/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Furnitoret</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="Emri" value={form.emri} onChange={e => setForm({...form, emri: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Personi kontaktit" value={form.personi_kontaktit} onChange={e => setForm({...form, personi_kontaktit: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Telefoni" value={form.telefoni} onChange={e => setForm({...form, telefoni: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Adresa" value={form.adresa} onChange={e => setForm({...form, adresa: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Lloji produkteve" value={form.lloji_produkteve} onChange={e => setForm({...form, lloji_produkteve: e.target.value})} />
        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {editId ? 'Përditëso' : 'Shto'}
        </button>
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Emri</th>
            <th className="p-3 text-left">Kontakti</th>
            <th className="p-3 text-left">Telefoni</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {furnitoret.map(item => (
            <tr key={item.furnitor_id} className="border-t">
              <td className="p-3">{item.emri}</td>
              <td className="p-3">{item.personi_kontaktit}</td>
              <td className="p-3">{item.telefoni}</td>
              <td className="p-3">{item.email}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Ndrysho</button>
                <button onClick={() => handleDelete(item.furnitor_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Furnitori;