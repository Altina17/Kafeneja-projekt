import { useState, useEffect } from 'react';
import API from '../api/axios';
<<<<<<< HEAD
import { toast } from 'react-toastify';

const Tavolinat = () => {
  const [tavolinat, setTavolinat] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({
    numri: '', kapaciteti: '', vendndodhja: '', statusi: ''
  });

  const fetchTavolinat = async () => {
=======

const Tavolinat = () => {
  const [tavolinat, setTavolinat] = useState([]);
  const [form, setForm] = useState({ numri: '', kapaciteti: '', vendndodhja: '', statusi: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
>>>>>>> 02b2f02def3908efff7c0705b18b4260120059d8
    const res = await API.get('/tables');
    setTavolinat(res.data);
  };

<<<<<<< HEAD
  useEffect(() => {
    fetchTavolinat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await API.put(`/tables/${editData.tavolina_id}`, form);
        toast.success(`Tavolina ${form.numri} u ndryshua me sukses!`);
      } else {
        await API.post('/tables', form);
        toast.success(`Tavolina ${form.numri} u shtua me sukses!`);
      }
      setForm({ numri: '', kapaciteti: '', vendndodhja: '', statusi: '' });
      setShowForm(false);
      setEditData(null);
      fetchTavolinat();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (tavolina) => {
    setEditData(tavolina);
    setForm(tavolina);
    setShowForm(true);
  };

  const handleDelete = async (id, numri) => {
    if (window.confirm(`A je i sigurt që dëshiron të fshish Tavolinën ${numri}?`)) {
      try {
        await API.delete(`/tables/${id}`);
        toast.success(`Tavolina ${numri} u fshi me sukses!`);
        fetchTavolinat();
      } catch (error) {
        toast.error('Ndodhi një gabim gjatë fshirjes!');
      }
=======
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/tables/${editId}`, form);
    } else {
      await API.post('/tables', form);
    }
    setForm({ numri: '', kapaciteti: '', vendndodhja: '', statusi: '' });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.tavolina_id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt?')) {
      await API.delete(`/tables/${id}`);
      fetchData();
>>>>>>> 02b2f02def3908efff7c0705b18b4260120059d8
    }
  };

  return (
    <div>
<<<<<<< HEAD
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tavolinat</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditData(null); setForm({ numri: '', kapaciteti: '', vendndodhja: '', statusi: '' }); }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Shto Tavolinë
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-4">{editData ? 'Ndrysho Tavolinë' : 'Shto Tavolinë'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input className="border p-2 rounded" placeholder="Numri" type="number" value={form.numri} onChange={(e) => setForm({...form, numri: e.target.value})} required />
            <input className="border p-2 rounded" placeholder="Kapaciteti" type="number" value={form.kapaciteti} onChange={(e) => setForm({...form, kapaciteti: e.target.value})} required />
            <input className="border p-2 rounded" placeholder="Vendndodhja" value={form.vendndodhja} onChange={(e) => setForm({...form, vendndodhja: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Statusi" value={form.statusi} onChange={(e) => setForm({...form, statusi: e.target.value})} />
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

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 text-sm">Numri</th>
              <th className="text-left p-2 text-sm">Kapaciteti</th>
              <th className="text-left p-2 text-sm">Vendndodhja</th>
              <th className="text-left p-2 text-sm">Statusi</th>
              <th className="text-left p-2 text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {tavolinat.map((t) => (
              <tr key={t.tavolina_id} className="border-t">
                <td className="p-2 text-sm">{t.numri}</td>
                <td className="p-2 text-sm">{t.kapaciteti}</td>
                <td className="p-2 text-sm">{t.vendndodhja}</td>
                <td className="p-2 text-sm">{t.statusi}</td>
                <td className="p-2">
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(t)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                    <button onClick={() => handleDelete(t.tavolina_id, t.numri)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
=======
      <h2 className="text-2xl font-bold mb-4">Tavolinat</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="Numri" type="number" value={form.numri} onChange={e => setForm({...form, numri: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Kapaciteti" type="number" value={form.kapaciteti} onChange={e => setForm({...form, kapaciteti: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Vendndodhja" value={form.vendndodhja} onChange={e => setForm({...form, vendndodhja: e.target.value})} />
        <select className="border p-2 rounded" value={form.statusi} onChange={e => setForm({...form, statusi: e.target.value})}>
          <option value="">Statusi</option>
          <option value="e lire">E lirë</option>
          <option value="e zene">E zënë</option>
          <option value="rezervuar">Rezervuar</option>
        </select>
        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {editId ? 'Përditëso' : 'Shto'}
        </button>
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Numri</th>
            <th className="p-3 text-left">Kapaciteti</th>
            <th className="p-3 text-left">Vendndodhja</th>
            <th className="p-3 text-left">Statusi</th>
            <th className="p-3 text-left">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {tavolinat.map(item => (
            <tr key={item.tavolina_id} className="border-t">
              <td className="p-3">{item.numri}</td>
              <td className="p-3">{item.kapaciteti}</td>
              <td className="p-3">{item.vendndodhja}</td>
              <td className="p-3">{item.statusi}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Ndrysho</button>
                <button onClick={() => handleDelete(item.tavolina_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
>>>>>>> 02b2f02def3908efff7c0705b18b4260120059d8
    </div>
  );
};

export default Tavolinat;