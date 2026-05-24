import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const STORAGE_KEY = 'kafeneja_recetat';
const loadRecetat = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } };
const saveRecetat = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

const RecetaPerberesit = () => {
  const [produktet, setProduktet] = useState([]);
  const [inventari, setInventari] = useState([]);
  const [recetat, setRecetat] = useState(loadRecetat());
  const [zgjedhurId, setZgjedhurId] = useState('');
  const [form, setForm] = useState({ inventar_id: '', sasia: '', njesia: '' });
  const [editIdx, setEditIdx] = useState(null);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, idx: null });

  useEffect(() => {
    API.get('/products').then(r => setProduktet(r.data));
    API.get('/inventari').then(r => setInventari(r.data));
  }, []);

  const recetaAktuale = zgjedhurId ? (recetat[zgjedhurId] || []) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const artikulli = inventari.find(i => i.inventar_id == form.inventar_id);
    const hyrja = {
      inventar_id: form.inventar_id,
      emri: artikulli?.emri_artikullit || '',
      sasia: form.sasia,
      njesia: form.njesia || artikulli?.njesia_matese || '',
    };
    const recetaRe = [...recetaAktuale];
    if (editIdx !== null) { recetaRe[editIdx] = hyrja; } else { recetaRe.push(hyrja); }
    const recetatRe = { ...recetat, [zgjedhurId]: recetaRe };
    setRecetat(recetatRe);
    saveRecetat(recetatRe);
    setForm({ inventar_id: '', sasia: '', njesia: '' });
    setEditIdx(null);
    toast.success('Përbërësi u shtua me sukses!');
  };

  const handleEdit = (idx) => {
    const p = recetaAktuale[idx];
    setForm({ inventar_id: p.inventar_id, sasia: p.sasia, njesia: p.njesia });
    setEditIdx(idx);
  };

  const handleDelete = () => {
    const recetaRe = recetaAktuale.filter((_, i) => i !== konfirmo.idx);
    const recetatRe = { ...recetat, [zgjedhurId]: recetaRe };
    setRecetat(recetatRe);
    saveRecetat(recetatRe);
    setKonfirmo({ shfaq: false, idx: null });
    toast.success('Përbërësi u fshi me sukses!');
  };

  return (
    <div>
      {konfirmo.shfaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-bold mb-2">Konfirmo Fshirjen</h3>
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron ta fshish këtë përbërës?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, idx: null })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Receta & Përbërësit</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <label className="text-sm text-gray-500 block mb-1">Zgjedh Produktin</label>
        <select className="border p-2 rounded w-full" value={zgjedhurId} onChange={e => { setZgjedhurId(e.target.value); setForm({ inventar_id: '', sasia: '', njesia: '' }); setEditIdx(null); }}>
          <option value="">-- Zgjedh produktin --</option>
          {produktet.map(p => (
            <option key={p.produkt_id} value={p.produkt_id}>
              {p.emri} — {(recetat[p.produkt_id] || []).length} përbërës
            </option>
          ))}
        </select>
      </div>

      {zgjedhurId && (
        <>
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-3 gap-3">
            <select className="border p-2 rounded" value={form.inventar_id} onChange={e => {
              const art = inventari.find(i => i.inventar_id == e.target.value);
              setForm({ ...form, inventar_id: e.target.value, njesia: art?.njesia_matese || '' });
            }} required>
              <option value="">-- Zgjedh artikullin --</option>
              {inventari.map(i => (
                <option key={i.inventar_id} value={i.inventar_id}>{i.emri_artikullit} ({i.njesia_matese})</option>
              ))}
            </select>
            <input className="border p-2 rounded" placeholder="Sasia (p.sh. 0.2)" type="number" step="0.01" min="0" value={form.sasia} onChange={e => setForm({ ...form, sasia: e.target.value })} required />
            <input className="border p-2 rounded" placeholder="Njësia (kg, L, copë...)" value={form.njesia} onChange={e => setForm({ ...form, njesia: e.target.value })} />
            <button type="submit" className="col-span-3 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              {editIdx !== null ? 'Përditëso' : 'Shto Përbërës'}
            </button>
          </form>

          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left text-sm">Artikulli</th>
                  <th className="p-3 text-left text-sm">Sasia</th>
                  <th className="p-3 text-left text-sm">Njësia</th>
                  <th className="p-3 text-left text-sm">Veprimet</th>
                </tr>
              </thead>
              <tbody>
                {recetaAktuale.length === 0 ? (
                  <tr><td colSpan={4} className="p-6 text-center text-gray-400">Nuk ka përbërës ende.</td></tr>
                ) : (
                  recetaAktuale.map((item, idx) => (
                    <tr key={idx} className="border-t even:bg-gray-50">
                      <td className="p-3 text-sm">{item.emri}</td>
                      <td className="p-3 text-sm">{item.sasia}</td>
                      <td className="p-3 text-sm">{item.njesia || '—'}</td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <button onClick={() => handleEdit(idx)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                          <button onClick={() => setKonfirmo({ shfaq: true, idx })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
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