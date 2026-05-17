import { useState, useEffect } from 'react';
import API from '../api/axios';

const Furnitori = () => {
  const [furnitoret, setFurnitoret] = useState([]);
  const [kerkim, setKerkim] = useState('');
  const [form, setForm] = useState({ emri: '', personi_kontaktit: '', telefoni: '', email: '', adresa: '', lloji_produkteve: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const res = await API.get('/furnitoret');
    setFurnitoret(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const furnitoretFiltruar = furnitoret.filter(f =>
    f.emri?.toLowerCase().includes(kerkim.toLowerCase()) ||
    f.lloji_produkteve?.toLowerCase().includes(kerkim.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/furnitoret/${editId}`, form);
    } else {
      await API.post('/furnitoret', form);
    }
    setForm({ emri: '', personi_kontaktit: '', telefoni: '', email: '', adresa: '', lloji_produkteve: '' });
    setEditId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.furnitor_id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt?')) {
      await API.delete(`/furnitoret/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Furnitoret</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ emri: '', personi_kontaktit: '', telefoni: '', email: '', adresa: '', lloji_produkteve: '' }); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Shto Furnitor
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="🔍 Kërko furnitor..." className="border p-2 rounded w-64" value={kerkim} onChange={e => setKerkim(e.target.value)} />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
          <input className="border p-2 rounded" placeholder="Emri" value={form.emri} onChange={e => setForm({...form, emri: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Personi kontaktit" value={form.personi_kontaktit} onChange={e => setForm({...form, personi_kontaktit: e.target.value})} />
          <input className="border p-2 rounded" placeholder="Telefoni" value={form.telefoni} onChange={e => setForm({...form, telefoni: e.target.value})} />
          <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <input className="border p-2 rounded" placeholder="Adresa" value={form.adresa} onChange={e => setForm({...form, adresa: e.target.value})} />
          <input className="border p-2 rounded" placeholder="Lloji produkteve" value={form.lloji_produkteve} onChange={e => setForm({...form, lloji_produkteve: e.target.value})} />
          <div className="col-span-2 flex gap-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{editId ? 'Përditëso' : 'Shto'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Anulo</button>
          </div>
        </form>
      )}

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
          {furnitoretFiltruar.length === 0 ? (
            <tr><td colSpan="5" className="p-4 text-center text-gray-500">Nuk u gjet asnjë furnitor!</td></tr>
          ) : (
            furnitoretFiltruar.map(item => (
              <tr key={item.furnitor_id} className="border-t">
                <td className="p-3">{item.emri}</td>
                <td className="p-3">{item.personi_kontaktit}</td>
                <td className="p-3">{item.telefoni}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded">Ndrysho</button>
                  <button onClick={() => handleDelete(item.furnitor_id)} className="bg-red-500 text-white px-3 py-1 rounded">Fshi</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Furnitori;