import { useState, useEffect } from 'react';
import API from '../api/axios';

const Inventari = () => {
  const [inventari, setInventari] = useState([]);
  const [form, setForm] = useState({ emri_artikullit: '', njesia_matese: '', sasia_aktuale: '', sasia_minimale: '', furnitor_id: '', cmimi: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await API.get('/inventari');
    setInventari(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/inventari/${editId}`, form);
    } else {
      await API.post('/inventari', form);
    }
    setForm({ emri_artikullit: '', njesia_matese: '', sasia_aktuale: '', sasia_minimale: '', furnitor_id: '', cmimi: '' });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.inventar_id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt?')) {
      await API.delete(`/inventari/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inventari</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="Emri artikullit" value={form.emri_artikullit} onChange={e => setForm({...form, emri_artikullit: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Njesia matese" value={form.njesia_matese} onChange={e => setForm({...form, njesia_matese: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Sasia aktuale" type="number" value={form.sasia_aktuale} onChange={e => setForm({...form, sasia_aktuale: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Sasia minimale" type="number" value={form.sasia_minimale} onChange={e => setForm({...form, sasia_minimale: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Furnitor ID" type="number" value={form.furnitor_id} onChange={e => setForm({...form, furnitor_id: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Cmimi" type="number" value={form.cmimi} onChange={e => setForm({...form, cmimi: e.target.value})} />
        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {editId ? 'Përditëso' : 'Shto'}
        </button>
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Emri</th>
            <th className="p-3 text-left">Njesia</th>
            <th className="p-3 text-left">Sasia</th>
            <th className="p-3 text-left">Cmimi</th>
            <th className="p-3 text-left">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {inventari.map(item => (
            <tr key={item.inventar_id} className="border-t">
              <td className="p-3">{item.emri_artikullit}</td>
              <td className="p-3">{item.njesia_matese}</td>
              <td className="p-3">{item.sasia_aktuale}</td>
              <td className="p-3">{item.cmimi}€</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Ndrysho</button>
                <button onClick={() => handleDelete(item.inventar_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventari;