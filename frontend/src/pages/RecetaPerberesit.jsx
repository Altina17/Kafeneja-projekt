import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const RecetaPerberesit = () => {
  const [produktet, setProduktet] = useState([]);
  const [inventari, setInventari] = useState([]);
  const [recetaAktuale, setRecetaAktuale] = useState([]);
  const [zgjedhurId, setZgjedhurId] = useState('');
  const [zgjedhurEmri, setZgjedhurEmri] = useState('');
  const [form, setForm] = useState({ inventar_id: '', sasia: '', njesia: '' });
  const [editId, setEditId] = useState(null);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get('/products').then(r => setProduktet(r.data)).catch(() => toast.error('Gabim duke ngarkuar produktet'));
    API.get('/inventari').then(r => setInventari(r.data)).catch(() => toast.error('Gabim duke ngarkuar inventarin'));
  }, []);

  const fetchReceta = async (produkt_id) => {
    setLoading(true);
    try {
      const res = await API.get(`/receta/produkt/${produkt_id}`);
      setRecetaAktuale(res.data);
    } catch {
      toast.error('Gabim duke ngarkuar recetat');
    } finally {
      setLoading(false);
    }
  };

  const handleProduktiChange = (e) => {
    const id = e.target.value;
    const produkt = produktet.find(p => p.produkt_id == id);
    setZgjedhurId(id);
    setZgjedhurEmri(produkt?.emri || '');
    setForm({ inventar_id: '', sasia: '', njesia: '' });
    setEditId(null);
    if (id) fetchReceta(id);
    else setRecetaAktuale([]);
  };

  const handleArtikullChange = (e) => {
    const art = inventari.find(i => i.inventar_id == e.target.value);
    setForm({ ...form, inventar_id: e.target.value, njesia: art?.njesia_matese || '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/receta/${editId}`, { ...form, produkt_id: zgjedhurId });
        toast.success('Përbërësi u ndryshua!');
      } else {
        await API.post('/receta', { ...form, produkt_id: zgjedhurId });
        toast.success('Përbërësi u shtua!');
      }
      setForm({ inventar_id: '', sasia: '', njesia: '' });
      setEditId(null);
      fetchReceta(zgjedhurId);
    } catch {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (item) => {
    setForm({
      inventar_id: item.inventar_id,
      sasia: item.sasia,
      njesia: item.njesia || ''
    });
    setEditId(item.receta_id);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/receta/${konfirmo.id}`);
      toast.success('Përbërësi u fshi!');
      setKonfirmo({ shfaq: false, id: null });
      fetchReceta(zgjedhurId);
    } catch {
      toast.error('Gabim gjatë fshirjes!');
    }
  };

  return (
    <div className="p-4">
      {/* Modal konfirmim */}
      {konfirmo.shfaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-bold mb-2">Konfirmo Fshirjen</h3>
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron ta fshish këtë përbërës?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">Receta & Përbërësit</h2>

      {/* Zgjedhja e produktit */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <label className="text-sm font-medium text-gray-600 block mb-2">Zgjedh Produktin</label>
        <select
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={zgjedhurId}
          onChange={handleProduktiChange}
        >
          <option value="">-- Zgjedh produktin --</option>
          {produktet.map(p => (
            <option key={p.produkt_id} value={p.produkt_id}>{p.emri}</option>
          ))}
        </select>
      </div>

      {zgjedhurId && (
        <>
          {/* Titulli i produktit */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-semibold text-blue-700">📋 Receta për: {zgjedhurEmri}</span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{recetaAktuale.length} përbërës</span>
          </div>

          {/* Forma e shtimit */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">{editId ? '✏️ Ndrysho Përbërësin' : '➕ Shto Përbërës të Ri'}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Artikulli nga Inventari</label>
                <select
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={form.inventar_id}
                  onChange={handleArtikullChange}
                  required
                >
                  <option value="">-- Zgjedh artikullin --</option>
                  {inventari.map(i => (
                    <option key={i.inventar_id} value={i.inventar_id}>
                      {i.emri_artikullit} ({i.njesia_matese})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Sasia</label>
                <input
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="p.sh. 0.200"
                  type="number"
                  step="0.001"
                  min="0"
                  value={form.sasia}
                  onChange={e => setForm({ ...form, sasia: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Njësia</label>
                <input
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="kg, L, copë..."
                  value={form.njesia}
                  onChange={e => setForm({ ...form, njesia: e.target.value })}
                />
              </div>
              <div className="md:col-span-3 flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-medium">
                  {editId ? '💾 Ruaj Ndryshimet' : '➕ Shto Përbërës'}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={() => { setEditId(null); setForm({ inventar_id: '', sasia: '', njesia: '' }); }}
                    className="px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Anulo
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Tabela e përbërësve */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">#</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Artikulli</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Sasia</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Njësia</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Veprimet</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="p-6 text-center text-gray-400">Duke ngarkuar...</td></tr>
                ) : recetaAktuale.length === 0 ? (
                  <tr><td colSpan={5} className="p-6 text-center text-gray-400">Nuk ka përbërës për këtë produkt.</td></tr>
                ) : (
                  recetaAktuale.map((item, idx) => (
                    <tr key={item.receta_id} className={`border-t ${editId === item.receta_id ? 'bg-yellow-50' : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="p-3 text-sm text-gray-500">{idx + 1}</td>
                      <td className="p-3 text-sm font-medium">{item.emri_artikullit}</td>
                      <td className="p-3 text-sm">{item.sasia}</td>
                      <td className="p-3 text-sm">{item.njesia || item.njesia_matese || '—'}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-3 py-1 rounded text-xs hover:bg-yellow-500">✏️ Ndrysho</button>
                          <button onClick={() => setKonfirmo({ shfaq: true, id: item.receta_id })} className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">🗑️ Fshij</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default RecetaPerberesit;