import { useState, useEffect } from 'react';
import API from '../api/axios';

const Tavolinat = () => {
  const [tavolinat, setTavolinat] = useState([]);
  const [form, setForm] = useState({ numri: '', kapaciteti: '', vendndodhja: '', statusi: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await API.get('/tables');
    setTavolinat(res.data);
  };

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
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default Tavolinat;