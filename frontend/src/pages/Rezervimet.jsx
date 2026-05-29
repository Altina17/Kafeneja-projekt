import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Rezervimet = () => {
  const [rezervimet, setRezervimet] = useState([]);
  const [tavolinat, setTavolinat] = useState([]);
  const [tavolinatZena, setTavolinatZena] = useState([]);
  const [kerkim, setKerkim] = useState('');
  const [filtriStatusi, setFiltriStatusi] = useState('');
  const [form, setForm] = useState({ emri_klientit: '', telefoni: '', tavolina_id: '', data: '', ora: '', numri_personave: '', statusi: 'aktive' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null });

  const fetchData = async () => {
    const res = await API.get('/rezervimet');
    setRezervimet(res.data);
  };

  useEffect(() => {
    fetchData();
    API.get('/tables').then(r => setTavolinat(r.data));
  }, []);

  useEffect(() => {
    if (form.data && form.ora) {
      API.get(`/rezervimet/tavolina-zena?data=${form.data}&ora=${form.ora}`)
        .then(r => setTavolinatZena(r.data.map(id => Number(id))))
        .catch(() => setTavolinatZena([]));
    } else {
      setTavolinatZena([]);
    }
  }, [form.data, form.ora]);

  const emriTavolines = (id) => {
  const t = tavolinat.find(t => t.tavolina_id === Number(id));
  return t ? `Tavolina ${t.numri}` : `Tavolina ${id}`;
};

  const rezervimetFiltruar = rezervimet.filter(r => {
    const perputhetKerkim = r.emri_klientit?.toLowerCase().includes(kerkim.toLowerCase());
    const perputhetStatusi = filtriStatusi === '' || r.statusi === filtriStatusi;
    return perputhetKerkim && perputhetStatusi;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/rezervimet/${editId}`, form);
        toast.success('Rezervimi u ndryshua me sukses!');
      } else {
        await API.post('/rezervimet', form);
        toast.success('Rezervimi u shtua me sukses!');
      }
      setForm({ emri_klientit: '', telefoni: '', tavolina_id: '', data: '', ora: '', numri_personave: '', statusi: 'aktive' });
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Ndodhi një gabim!');
    }
  };

  const handleEdit = (item) => {
    const data = item.data ? new Date(item.data).toISOString().slice(0, 10) : '';
    setForm({...item, data});
    setEditId(item.rezervim_id);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/rezervimet/${konfirmo.id}`);
      toast.success('Rezervimi u fshi me sukses!');
      setKonfirmo({ shfaq: false, id: null });
      fetchData();
    } catch (error) {
      toast.error('Gabim gjatë fshirjes!');
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
      {konfirmo.shfaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-bold mb-2">Konfirmo Fshirjen</h3>
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron ta fshish këtë rezervim?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Rezervimet</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ emri_klientit: '', telefoni: '', tavolina_id: '', data: '', ora: '', numri_personave: '', statusi: 'aktive' }); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Shto Rezervim
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="🔍 Kërko klient..." className="border p-2 rounded w-64" value={kerkim} onChange={e => setKerkim(e.target.value)} />
        <select className="border p-2 rounded" value={filtriStatusi} onChange={e => setFiltriStatusi(e.target.value)}>
          <option value="">Të gjitha statuset</option>
          <option value="aktive">Aktive</option>
          <option value="anuluar">Anuluar</option>
          <option value="perfunduar">Përfunduar</option>
        </select>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Emri Klientit</label>
            <input className="border p-2 rounded w-full" placeholder="Emri klientit" value={form.emri_klientit} onChange={e => setForm({...form, emri_klientit: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Telefoni</label>
            <input className="border p-2 rounded w-full" placeholder="Telefoni" value={form.telefoni} onChange={e => setForm({...form, telefoni: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Data</label>
            <input className="border p-2 rounded w-full" type="date" value={form.data} onChange={e => setForm({...form, data: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Ora</label>
            <input className="border p-2 rounded w-full" type="time" value={form.ora} onChange={e => setForm({...form, ora: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Tavolina</label>
            {(!form.data || !form.ora) && (
              <p className="text-xs text-orange-500 mb-1">Zgjidh datën dhe orën fillimisht</p>
            )}
            <select className="border p-2 rounded w-full" value={form.tavolina_id} onChange={e => setForm({...form, tavolina_id: e.target.value})} required>
              <option value="">Zgjidh tavolinën</option>
              {tavolinat.map(t => {
                const eshteZene = tavolinatZena.includes(Number(t.tavolina_id));
                return (
                  <option
                    key={t.tavolina_id}
                    value={t.tavolina_id}
                    disabled={eshteZene}
                    style={eshteZene ? { color: 'red' } : {}}>
                    Tavolina {t.numri} - Kap: {t.kapaciteti} {eshteZene ? '(e rezervuar)' : ''}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Numri Personave</label>
            <input className="border p-2 rounded w-full" placeholder="Numri personave" type="number" value={form.numri_personave} onChange={e => setForm({...form, numri_personave: e.target.value})} />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Statusi</label>
            <select className="border p-2 rounded w-full" value={form.statusi} onChange={e => setForm({...form, statusi: e.target.value})}>
              <option value="aktive">Aktive</option>
              <option value="anuluar">Anuluar</option>
              <option value="perfunduar">Përfunduar</option>
            </select>
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
              <th className="p-3 text-left text-sm">Klienti</th>
              <th className="p-3 text-left text-sm">Telefoni</th>
              <th className="p-3 text-left text-sm">Tavolina</th>
              <th className="p-3 text-left text-sm">Data</th>
              <th className="p-3 text-left text-sm">Ora</th>
              <th className="p-3 text-left text-sm">Statusi</th>
              <th className="p-3 text-left text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {rezervimetFiltruar.length === 0 ? (
              <tr><td colSpan="7" className="p-4 text-center text-gray-500">Nuk u gjet asnjë rezervim!</td></tr>
            ) : (
              rezervimetFiltruar.map(item => (
                <tr key={item.rezervim_id} className="border-t even:bg-gray-50">
                  <td className="p-3 text-sm">{item.emri_klientit}</td>
                  <td className="p-3 text-sm">{item.telefoni}</td>
                  <td className="p-3 text-sm">{emriTavolines(item.tavolina_id)}</td>
                  <td className="p-3 text-sm">{item.data ? new Date(item.data).toISOString().slice(0, 10) : '—'}</td>
                  <td className="p-3 text-sm">{item.ora}</td>
                  <td className="p-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusiBadge(item.statusi)}`}>{item.statusi}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                      <button onClick={() => setKonfirmo({ shfaq: true, id: item.rezervim_id })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
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

export default Rezervimet;