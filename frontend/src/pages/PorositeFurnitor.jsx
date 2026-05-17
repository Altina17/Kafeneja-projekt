import { useState, useEffect } from 'react';
import API from '../api/axios';

const PorositeFurnitor = () => {
  const [porosite, setPorosite] = useState([]);
  const [kerkim, setKerkim] = useState('');
  const [filtriStatusi, setFiltriStatusi] = useState('');
  const [form, setForm] = useState({ furnitor_id: '', data_porosise: '', shuma_totale: '', statusi: '', data_pranimit: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const res = await API.get('/porosite-furnitor');
    setPorosite(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const porositeFiltruar = porosite.filter(p => {
    const perputhetKerkim = p.furnitor_id?.toString().includes(kerkim);
    const perputhetStatusi = filtriStatusi === '' || p.statusi === filtriStatusi;
    return perputhetKerkim && perputhetStatusi;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/porosite-furnitor/${editId}`, form);
    } else {
      await API.post('/porosite-furnitor', form);
    }
    setForm({ furnitor_id: '', data_porosise: '', shuma_totale: '', statusi: '', data_pranimit: '' });
    setEditId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.porosi_furn_id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt?')) {
      await API.delete(`/porosite-furnitor/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Porositë e Furnitoreve</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ furnitor_id: '', data_porosise: '', shuma_totale: '', statusi: '', data_pranimit: '' }); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Shto Porosi
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="🔍 Kërko furnitor ID..." className="border p-2 rounded w-64" value={kerkim} onChange={e => setKerkim(e.target.value)} />
        <select className="border p-2 rounded" value={filtriStatusi} onChange={e => setFiltriStatusi(e.target.value)}>
          <option value="">Të gjitha statuset</option>
          <option value="pending">Pending</option>
          <option value="pranuar">Pranuar</option>
          <option value="anuluar">Anuluar</option>
        </select>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
          <input className="border p-2 rounded" placeholder="Furnitor ID" type="number" value={form.furnitor_id} onChange={e => setForm({...form, furnitor_id: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Data porosise" type="date" value={form.data_porosise} onChange={e => setForm({...form, data_porosise: e.target.value})} />
          <input className="border p-2 rounded" placeholder="Shuma totale" type="number" value={form.shuma_totale} onChange={e => setForm({...form, shuma_totale: e.target.value})} />
          <select className="border p-2 rounded" value={form.statusi} onChange={e => setForm({...form, statusi: e.target.value})}>
            <option value="">Statusi</option>
            <option value="pending">Pending</option>
            <option value="pranuar">Pranuar</option>
            <option value="anuluar">Anuluar</option>
          </select>
          <input className="border p-2 rounded col-span-2" placeholder="Data pranimit" type="date" value={form.data_pranimit} onChange={e => setForm({...form, data_pranimit: e.target.value})} />
          <div className="col-span-2 flex gap-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{editId ? 'Përditëso' : 'Shto'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Anulo</button>
          </div>
        </form>
      )}

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Furnitor ID</th>
            <th className="p-3 text-left">Data porosise</th>
            <th className="p-3 text-left">Shuma</th>
            <th className="p-3 text-left">Statusi</th>
            <th className="p-3 text-left">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {porositeFiltruar.length === 0 ? (
            <tr><td colSpan="5" className="p-4 text-center text-gray-500">Nuk u gjet asnjë porosi!</td></tr>
          ) : (
            porositeFiltruar.map(item => (
              <tr key={item.porosi_furn_id} className="border-t">
                <td className="p-3">{item.furnitor_id}</td>
                <td className="p-3">{item.data_porosise}</td>
                <td className="p-3">{item.shuma_totale}€</td>
                <td className="p-3">{item.statusi}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded">Ndrysho</button>
                  <button onClick={() => handleDelete(item.porosi_furn_id)} className="bg-red-500 text-white px-3 py-1 rounded">Fshi</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PorositeFurnitor;