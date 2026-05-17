import { useState, useEffect } from 'react';
import API from '../api/axios';

const Inventari = () => {
  const [inventari, setInventari] = useState([]);
  const [kerkim, setKerkim] = useState('');
  const [form, setForm] = useState({ emri: '', sasia: '', njesia: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const res = await API.get('/inventari');
    setInventari(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const inventariFiltruar = inventari.filter(i =>
    i.emri?.toLowerCase().includes(kerkim.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/inventari/${editId}`, form);
    } else {
      await API.post('/inventari', form);
    }
    setForm({ emri: '', sasia: '', njesia: '' });
    setEditId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.inventar_id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt?')) {
      await API.delete(`/inventari/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Inventari</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ emri: '', sasia: '', njesia: '' }); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Shto Artikull
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="🔍 Kërko artikull..." className="border p-2 rounded w-64" value={kerkim} onChange={e => setKerkim(e.target.value)} />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
          <input className="border p-2 rounded" placeholder="Emri artikullit" value={form.emri} onChange={e => setForm({...form, emri: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Sasia" type="number" value={form.sasia} onChange={e => setForm({...form, sasia: e.target.value})} />
          <input className="border p-2 rounded col-span-2" placeholder="Njesia matese" value={form.njesia} onChange={e => setForm({...form, njesia: e.target.value})} />
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
            <th className="p-3 text-left">Sasia</th>
            <th className="p-3 text-left">Njesia</th>
            <th className="p-3 text-left">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {inventariFiltruar.length === 0 ? (
            <tr><td colSpan="4" className="p-4 text-center text-gray-500">Nuk u gjet asnjë artikull!</td></tr>
          ) : (
            inventariFiltruar.map(item => (
              <tr key={item.inventar_id} className="border-t">
                <td className="p-3">{item.emri}</td>
                <td className="p-3">{item.sasia}</td>
                <td className="p-3">{item.njesia}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded">Ndrysho</button>
                  <button onClick={() => handleDelete(item.inventar_id)} className="bg-red-500 text-white px-3 py-1 rounded">Fshi</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Inventari;