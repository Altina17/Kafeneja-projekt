import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const PorositeFurnitor = () => {
  const [porosite, setPorosite] = useState([]);
  const [furnitoret, setFurnitoret] = useState([]);
  const [kerkim, setKerkim] = useState('');
  const [filtriStatusi, setFiltriStatusi] = useState('');
  const [form, setForm] = useState({ furnitor_id: '', data_porosise: '', shuma_totale: '', statusi: 'pending', data_pranimit: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null });

  const fetchData = async () => {
    const res = await API.get('/porosite-furnitor');
    setPorosite(res.data);
  };

  useEffect(() => {
    fetchData();
    API.get('/furnitoret').then(r => setFurnitoret(r.data));
  }, []);

  const emriFurnitorit = (id) => {
    const f = furnitoret.find(f => f.furnitor_id === id);
    return f ? f.emri : id;
  };

  const porositeFiltruar = porosite.filter(p => {
    const furnitori = furnitoret.find(f => f.furnitor_id === p.furnitor_id);
    const emri = furnitori ? furnitori.emri.toLowerCase() : '';
    const perputhetKerkim = emri.includes(kerkim.toLowerCase());
    const perputhetStatusi = filtriStatusi === '' || p.statusi === filtriStatusi;
    return perputhetKerkim && perputhetStatusi;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/porosite-furnitor/${editId}`, form);
        toast.success('Porosia u ndryshua me sukses!');
      } else {
        await API.post('/porosite-furnitor', form);
        toast.success('Porosia u shtua me sukses!');
      }
      setForm({ furnitor_id: '', data_porosise: '', shuma_totale: '', statusi: 'pending', data_pranimit: '' });
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (item) => {
    setForm({...item, data_porosise: item.data_porosise?.slice(0, 10), data_pranimit: item.data_pranimit?.slice(0, 10)});
    setEditId(item.porosi_furn_id);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/porosite-furnitor/${konfirmo.id}`);
      toast.success('Porosia u fshi me sukses!');
      setKonfirmo({ shfaq: false, id: null });
      fetchData();
    } catch (error) {
      toast.error('Gabim gjatë fshirjes!');
    }
  };

  const statusiBadge = (statusi) => {
    const ngjyrat = {
      pending: 'bg-yellow-100 text-yellow-700',
      pranuar: 'bg-green-100 text-green-700',
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
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron ta fshish këtë porosi?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Porositë e Furnitoreve</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ furnitor_id: '', data_porosise: '', shuma_totale: '', statusi: 'pending', data_pranimit: '' }); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Shto Porosi
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="🔍 Kërko furnitor..." className="border p-2 rounded w-64" value={kerkim} onChange={e => setKerkim(e.target.value)} />
        <select className="border p-2 rounded" value={filtriStatusi} onChange={e => setFiltriStatusi(e.target.value)}>
          <option value="">Të gjitha statuset</option>
          <option value="pending">Pending</option>
          <option value="pranuar">Pranuar</option>
          <option value="anuluar">Anuluar</option>
        </select>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Furnitori</label>
            <select className="border p-2 rounded w-full" value={form.furnitor_id} onChange={e => setForm({...form, furnitor_id: e.target.value})} required>
              <option value="">Zgjidh furnitorin</option>
              {furnitoret.map(f => (
                <option key={f.furnitor_id} value={f.furnitor_id}>{f.emri} - {f.lloji_produkteve}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Shuma Totale (€)</label>
            <input className="border p-2 rounded w-full" placeholder="0.00" type="number" step="0.01" value={form.shuma_totale} onChange={e => setForm({...form, shuma_totale: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Data Porosisë</label>
            <input className="border p-2 rounded w-full" type="date" value={form.data_porosise} onChange={e => setForm({...form, data_porosise: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Data Pranimit</label>
            <input className="border p-2 rounded w-full" type="date" value={form.data_pranimit} onChange={e => setForm({...form, data_pranimit: e.target.value})} />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Statusi</label>
            <select className="border p-2 rounded w-full" value={form.statusi} onChange={e => setForm({...form, statusi: e.target.value})}>
              <option value="pending">Pending</option>
              <option value="pranuar">Pranuar</option>
              <option value="anuluar">Anuluar</option>
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
              <th className="p-3 text-left text-sm">Furnitori</th>
              <th className="p-3 text-left text-sm">Data Porosisë</th>
              <th className="p-3 text-left text-sm">Shuma</th>
              <th className="p-3 text-left text-sm">Statusi</th>
              <th className="p-3 text-left text-sm">Data Pranimit</th>
              <th className="p-3 text-left text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {porositeFiltruar.length === 0 ? (
              <tr><td colSpan="6" className="p-4 text-center text-gray-500">Nuk u gjet asnjë porosi!</td></tr>
            ) : (
              porositeFiltruar.map(item => (
                <tr key={item.porosi_furn_id} className="border-t even:bg-gray-50">
                  <td className="p-3 text-sm">{emriFurnitorit(item.furnitor_id)}</td>
                  <td className="p-3 text-sm">{item.data_porosise?.slice(0, 10)}</td>
                  <td className="p-3 text-sm">{item.shuma_totale}€</td>
                  <td className="p-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusiBadge(item.statusi)}`}>{item.statusi}</span>
                  </td>
                  <td className="p-3 text-sm">{item.data_pranimit?.slice(0, 10) || '—'}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                      <button onClick={() => setKonfirmo({ shfaq: true, id: item.porosi_furn_id })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
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

export default PorositeFurnitor;