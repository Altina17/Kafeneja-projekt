import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Inventari = () => {
  const [inventari, setInventari] = useState([]);
  const [furnitoret, setFurnitoret] = useState([]);
  const [kerkim, setKerkim] = useState('');
  const [form, setForm] = useState({ emri_artikullit: '', njesia_matese: '', sasia_aktuale: '', sasia_minimale: '', furnitor_id: '', cmimi: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null });

  const fetchData = async () => {
    const res = await API.get('/inventari');
    setInventari(res.data);
  };

  useEffect(() => {
    fetchData();
    API.get('/furnitoret').then(r => setFurnitoret(r.data));
  }, []);

  const emriFurnitorit = (id) => {
    const f = furnitoret.find(f => f.furnitor_id === id);
    return f ? f.emri : '—';
  };

  const inventariFiltruar = inventari.filter(i =>
    i.emri_artikullit?.toLowerCase().includes(kerkim.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/inventari/${editId}`, form);
        toast.success('Artikulli u ndryshua me sukses!');
      } else {
        await API.post('/inventari', form);
        toast.success('Artikulli u shtua me sukses!');
      }
      setForm({ emri_artikullit: '', njesia_matese: '', sasia_aktuale: '', sasia_minimale: '', furnitor_id: '', cmimi: '' });
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.inventar_id);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/inventari/${konfirmo.id}`);
      toast.success('Artikulli u fshi me sukses!');
      setKonfirmo({ shfaq: false, id: null });
      fetchData();
    } catch (error) {
      toast.error('Gabim gjatë fshirjes!');
    }
  };

  return (
    <div>
      {konfirmo.shfaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-bold mb-2">Konfirmo Fshirjen</h3>
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron ta fshish këtë artikull?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Inventari</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ emri_artikullit: '', njesia_matese: '', sasia_aktuale: '', sasia_minimale: '', furnitor_id: '', cmimi: '' }); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Shto Artikull
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="🔍 Kërko artikull..." className="border p-2 rounded w-64" value={kerkim} onChange={e => setKerkim(e.target.value)} />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Emri Artikullit</label>
            <input className="border p-2 rounded w-full" placeholder="Emri artikullit" value={form.emri_artikullit} onChange={e => setForm({...form, emri_artikullit: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Njësia Matëse</label>
            <input className="border p-2 rounded w-full" placeholder="kg, L, copë..." value={form.njesia_matese} onChange={e => setForm({...form, njesia_matese: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Sasia Aktuale</label>
            <input className="border p-2 rounded w-full" placeholder="0" type="number" step="0.01" value={form.sasia_aktuale} onChange={e => setForm({...form, sasia_aktuale: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Sasia Minimale</label>
            <input className="border p-2 rounded w-full" placeholder="0" type="number" step="0.01" value={form.sasia_minimale} onChange={e => setForm({...form, sasia_minimale: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Furnitori</label>
            <select className="border p-2 rounded w-full" value={form.furnitor_id} onChange={e => setForm({...form, furnitor_id: e.target.value})}>
              <option value="">Zgjidh furnitorin</option>
              {furnitoret.map(f => (
                <option key={f.furnitor_id} value={f.furnitor_id}>{f.emri}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Cmimi (€)</label>
            <input className="border p-2 rounded w-full" placeholder="0.00" type="number" step="0.01" value={form.cmimi} onChange={e => setForm({...form, cmimi: e.target.value})} />
          </div>
          <div className="col-span-2 flex gap-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">{editId ? 'Ruaj Ndryshimet' : 'Shto'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Anulo</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-sm">Artikulli</th>
              <th className="p-3 text-left text-sm">Njësia</th>
              <th className="p-3 text-left text-sm">Sasia Aktuale</th>
              <th className="p-3 text-left text-sm">Sasia Min.</th>
              <th className="p-3 text-left text-sm">Furnitori</th>
              <th className="p-3 text-left text-sm">Cmimi</th>
              <th className="p-3 text-left text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {inventariFiltruar.length === 0 ? (
              <tr><td colSpan="7" className="p-4 text-center text-gray-500">Nuk u gjet asnjë artikull!</td></tr>
            ) : (
              inventariFiltruar.map(item => (
                <tr key={item.inventar_id} className="border-t even:bg-gray-50">
                  <td className="p-3 text-sm">{item.emri_artikullit}</td>
                  <td className="p-3 text-sm">{item.njesia_matese}</td>
                  <td className="p-3 text-sm">{item.sasia_aktuale}</td>
                  <td className="p-3 text-sm">{item.sasia_minimale}</td>
                  <td className="p-3 text-sm">{emriFurnitorit(item.furnitor_id)}</td>
                  <td className="p-3 text-sm">{item.cmimi}€</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                      <button onClick={() => setKonfirmo({ shfaq: true, id: item.inventar_id })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
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

export default Inventari;