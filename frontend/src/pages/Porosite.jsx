import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Porosite = () => {
  const [porosite, setPorosite] = useState([]);
  const [tavolinat, setTavolinat] = useState([]);
  const [punetoret, setPunetoret] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null });
  const [form, setForm] = useState({
    tavolina_id: '', kamarier_id: '', data_ora: '', shuma_totale: '', statusi: 'aktive', metoda_pageses: 'kesh'
  });

  const fetchPorosite = async () => {
    const res = await API.get('/orders');
    setPorosite(res.data);
  };

  useEffect(() => {
    fetchPorosite();
    API.get('/tables').then(r => setTavolinat(r.data));
    API.get('/employees').then(r => setPunetoret(r.data));
  }, []);

  const emriTavolines = (id) => {
    const t = tavolinat.find(t => t.tavolina_id === id);
    return t ? `Tavolina ${t.numri}` : id;
  };

  const emriKamarierit = (id) => {
    const p = punetoret.find(p => p.punetor_id === id);
    return p ? `${p.emri} ${p.mbiemri}` : id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await API.put(`/orders/${editData.porosi_id}`, form);
        toast.success('Porosia u ndryshua me sukses!');
      } else {
        await API.post('/orders', form);
        toast.success('Porosia u shtua me sukses!');
      }
      setForm({ tavolina_id: '', kamarier_id: '', data_ora: '', shuma_totale: '', statusi: 'aktive', metoda_pageses: 'kesh' });
      setShowForm(false);
      setEditData(null);
      fetchPorosite();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (porosi) => {
    setEditData(porosi);
    setForm({
      ...porosi,
      data_ora: porosi.data_ora ? new Date(porosi.data_ora).toISOString().slice(0, 16) : ''
    });
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/orders/${konfirmo.id}`);
      toast.success('Porosia u fshi me sukses!');
      setKonfirmo({ shfaq: false, id: null });
      fetchPorosite();
    } catch (error) {
      toast.error('Ndodhi një gabim gjatë fshirjes!');
    }
  };

  const statusiBadge = (statusi) => {
    const ngjyrat = {
      aktive: 'bg-blue-100 text-blue-700',
      perfunduar: 'bg-green-100 text-green-700',
      anuluar: 'bg-red-100 text-red-700',
    };
    return ngjyrat[statusi] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      {/* Modal konfirmimi */}
      {konfirmo.shfaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-bold mb-2">Konfirmo Fshirjen</h3>
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron ta fshish këtë porosi?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Porositë</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditData(null); setForm({ tavolina_id: '', kamarier_id: '', data_ora: '', shuma_totale: '', statusi: 'aktive', metoda_pageses: 'kesh' }); }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Shto Porosi
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-4">{editData ? 'Ndrysho Porosi' : 'Shto Porosi'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Tavolina</label>
              <select className="border p-2 rounded w-full" value={form.tavolina_id} onChange={(e) => setForm({...form, tavolina_id: e.target.value})} required>
                <option value="">Zgjidh tavolinën</option>
                {tavolinat.map(t => (
                  <option key={t.tavolina_id} value={t.tavolina_id}>Tavolina {t.numri} - Kapaciteti: {t.kapaciteti}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Kamarieri</label>
              <select className="border p-2 rounded w-full" value={form.kamarier_id} onChange={(e) => setForm({...form, kamarier_id: e.target.value})} required>
                <option value="">Zgjidh kamarierin</option>
                {punetoret.map(p => (
                  <option key={p.punetor_id} value={p.punetor_id}>{p.emri} {p.mbiemri} - {p.pozita}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Data dhe Ora</label>
              <input
                className="border p-2 rounded w-full"
                type="datetime-local"
                value={form.data_ora}
                onChange={(e) => setForm({...form, data_ora: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Shuma Totale (€)</label>
              <input className="border p-2 rounded w-full" placeholder="0.00" type="number" step="0.01" value={form.shuma_totale} onChange={(e) => setForm({...form, shuma_totale: e.target.value})} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Statusi</label>
              <select className="border p-2 rounded w-full" value={form.statusi} onChange={(e) => setForm({...form, statusi: e.target.value})}>
                <option value="aktive">Aktive</option>
                <option value="perfunduar">Përfunduar</option>
                <option value="anuluar">Anuluar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Metoda e Pagesës</label>
              <select className="border p-2 rounded w-full" value={form.metoda_pageses} onChange={(e) => setForm({...form, metoda_pageses: e.target.value})}>
                <option value="kesh">Kesh</option>
                <option value="kartë">Kartë</option>
                <option value="online">Online</option>
              </select>
            </div>

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
              <th className="text-left p-2 text-sm">Tavolina</th>
              <th className="text-left p-2 text-sm">Kamarieri</th>
              <th className="text-left p-2 text-sm">Data & Ora</th>
              <th className="text-left p-2 text-sm">Shuma</th>
              <th className="text-left p-2 text-sm">Statusi</th>
              <th className="text-left p-2 text-sm">Metoda</th>
              <th className="text-left p-2 text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {porosite.length === 0 ? (
              <tr><td colSpan="7" className="p-4 text-center text-gray-500">Nuk ka porosi!</td></tr>
            ) : (
              porosite.map((p) => (
                <tr key={p.porosi_id} className="border-t even:bg-gray-50">
                  <td className="p-2 text-sm">{emriTavolines(p.tavolina_id)}</td>
                  <td className="p-2 text-sm">{emriKamarierit(p.kamarier_id)}</td>
                  <td className="p-2 text-sm">{p.data_ora ? new Date(p.data_ora).toLocaleString('sq-AL') : '—'}</td>
                  <td className="p-2 text-sm">{p.shuma_totale}€</td>
                  <td className="p-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusiBadge(p.statusi)}`}>{p.statusi}</span>
                  </td>
                  <td className="p-2 text-sm">{p.metoda_pageses}</td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(p)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                      <button onClick={() => setKonfirmo({ shfaq: true, id: p.porosi_id })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
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

export default Porosite;