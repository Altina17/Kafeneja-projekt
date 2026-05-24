import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Kategorite = () => {
  const [kategorite, setKategorite] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null, emri: '' });
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
    try {
      if (editData) {
        await API.put(`/categories/${editData.kategori_id}`, form);
        toast.success(`Kategoria "${form.emri}" u ndryshua me sukses!`);
      } else {
        await API.post('/categories', form);
        toast.success(`Kategoria "${form.emri}" u shtua me sukses!`);
      }
      setForm({ emri: '', pershkrimi: '' });
      setShowForm(false);
      setEditData(null);
      fetchKategorite();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (kategori) => {
    setEditData(kategori);
    setForm(kategori);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/categories/${konfirmo.id}`);
      toast.success(`Kategoria "${konfirmo.emri}" u fshi me sukses!`);
      setKonfirmo({ shfaq: false, id: null, emri: '' });
      fetchKategorite();
    } catch (error) {
      toast.error('Ndodhi një gabim gjatë fshirjes!');
    }
  };

  return (
    <div>
      {konfirmo.shfaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-bold mb-2">Konfirmo Fshirjen</h3>
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron të fshish <strong>"{konfirmo.emri}"</strong>?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null, emri: '' })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

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
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">{editData ? 'Ruaj Ndryshimet' : 'Shto'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Anulo</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 text-sm">Emri</th>
              <th className="text-left p-2 text-sm">Pershkrimi</th>
              <th className="text-left p-2 text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {kategorite.length === 0 ? (
              <tr><td colSpan="3" className="p-4 text-center text-gray-500">Nuk ka kategori!</td></tr>
            ) : (
              kategorite.map((k) => (
                <tr key={k.kategori_id} className="border-t even:bg-gray-50">
                  <td className="p-2 text-sm">{k.emri}</td>
                  <td className="p-2 text-sm">{k.pershkrimi}</td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(k)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                      <button onClick={() => setKonfirmo({ shfaq: true, id: k.kategori_id, emri: k.emri })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kategorite;