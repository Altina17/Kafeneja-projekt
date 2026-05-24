import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Tavolinat = () => {
  const [tavolinat, setTavolinat] = useState([]);
  const [kerkim, setKerkim] = useState('');
  const [filtriStatusi, setFiltriStatusi] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null });
  const [form, setForm] = useState({ numri: '', kapaciteti: '', vendndodhja: '', statusi: '' });

  const fetchData = async () => {
    try {
      const res = await API.get('/tables');
      setTavolinat(res.data);
    } catch (error) {
      toast.error('Gabim gjatë marrjes së të dhënave!');
    }
  };

  useEffect(() => { fetchData(); }, []);

  const tavolinatFiltruar = tavolinat.filter(t => {
    const perputhetKerkim = t.vendndodhja?.toLowerCase().includes(kerkim.toLowerCase()) || t.numri?.toString().includes(kerkim);
    const perputhetStatusi = filtriStatusi === '' || t.statusi === filtriStatusi;
    return perputhetKerkim && perputhetStatusi;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/tables/${editId}`, form);
        toast.success('Tavolina u përditësua me sukses!');
      } else {
        await API.post('/tables', form);
        toast.success('Tavolina u shtua me sukses!');
      }
      setForm({ numri: '', kapaciteti: '', vendndodhja: '', statusi: '' });
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.tavolina_id);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/tables/${konfirmo.id}`);
      toast.success('Tavolina u fshi me sukses!');
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
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron ta fshish këtë tavolinë?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tavolinat</h1>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ numri: '', kapaciteti: '', vendndodhja: '', statusi: '' }); }} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + Shto Tavolinë
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="🔍 Kërko tavolinë..." className="border p-2 rounded w-64" value={kerkim} onChange={e => setKerkim(e.target.value)} />
        <select className="border p-2 rounded" value={filtriStatusi} onChange={e => setFiltriStatusi(e.target.value)}>
          <option value="">Të gjitha statuset</option>
          <option value="e lire">E lirë</option>
          <option value="e zene">E zënë</option>
          <option value="rezervuar">Rezervuar</option>
        </select>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Numri</label>
              <input className="border p-2 rounded w-full" placeholder="Numri" type="number" value={form.numri} onChange={(e) => setForm({...form, numri: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Kapaciteti</label>
              <input className="border p-2 rounded w-full" placeholder="Kapaciteti" type="number" value={form.kapaciteti} onChange={(e) => setForm({...form, kapaciteti: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Vendndodhja</label>
              <input className="border p-2 rounded w-full" placeholder="Vendndodhja" value={form.vendndodhja} onChange={(e) => setForm({...form, vendndodhja: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Statusi</label>
              <select className="border p-2 rounded w-full" value={form.statusi} onChange={(e) => setForm({...form, statusi: e.target.value})}>
                <option value="">Zgjidh statusin</option>
                <option value="e lire">E lirë</option>
                <option value="e zene">E zënë</option>
                <option value="rezervuar">Rezervuar</option>
              </select>
            </div>
            <div className="col-span-2 flex gap-2">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">{editId ? 'Ruaj Ndryshimet' : 'Shto'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Anulo</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-sm">Numri</th>
              <th className="p-3 text-left text-sm">Kapaciteti</th>
              <th className="p-3 text-left text-sm">Vendndodhja</th>
              <th className="p-3 text-left text-sm">Statusi</th>
              <th className="p-3 text-left text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {tavolinatFiltruar.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">Nuk u gjet asnjë tavolinë!</td></tr>
            ) : (
              tavolinatFiltruar.map((item) => (
                <tr key={item.tavolina_id} className="border-t even:bg-gray-50">
                  <td className="p-3 text-sm">{item.numri}</td>
                  <td className="p-3 text-sm">{item.kapaciteti}</td>
                  <td className="p-3 text-sm">{item.vendndodhja}</td>
                  <td className="p-3 text-sm">{item.statusi}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                      <button onClick={() => setKonfirmo({ shfaq: true, id: item.tavolina_id })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
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

export default Tavolinat;