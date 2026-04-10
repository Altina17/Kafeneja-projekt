import { useState, useEffect } from 'react';
import API from '../api/axios';

const Kategorite = () => {
  const [kategorite, setKategorite] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({ emri: '', pershkrimi: '' });

  const fetchKategorite = async () => {
    const res = await API.get('/categories');
    setKategorite(res.data);
  };

  useEffect(() => {
    fetchKategorite();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editData) {
      await API.put(`/categories/${editData.kategori_id}`, form);
    } else {
      await API.post('/categories', form);
    }
    setForm({ emri: '', pershkrimi: '' });
    setShowForm(false);
    setEditData(null);
    fetchKategorite();
  };

  const handleEdit = (kategori) => {
    setEditData(kategori);
    setForm(kategori);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A je i sigurt?')) {
      await API.delete(`/categories/${id}`);
      fetchKategorite();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kategorite</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditData(null); setForm({ emri: '', pershkrimi: '' }); }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Shto Kategori
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-4">{editData ? 'Ndrysho Kategori' : 'Shto Kategori'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input className="border p-2 rounded" placeholder="Emri" value={form.emri} onChange={(e) => setForm({...form, emri: e.target.value})} required />
            <input className="border p-2 rounded" placeholder="Pershkrimi" value={form.pershkrimi} onChange={(e) => setForm({...form, pershkrimi: e.target.value})} />
            <div className="col-span-2 flex gap-2">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                {editData ? 'Ruaj Ndryshimet' : 'Shto'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                Anulo
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4">Emri</th>
              <th className="text-left p-4">Pershkrimi</th>
              <th className="text-left p-4">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {kategorite.map((k) => (
              <tr key={k.kategori_id} className="border-t">
                <td className="p-4">{k.emri}</td>
                <td className="p-4">{k.pershkrimi}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEdit(k)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Ndrysho</button>
                  <button onClick={() => handleDelete(k.kategori_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Fshij</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kategorite;