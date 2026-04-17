import { useState, useEffect } from 'react';
import API from '../api/axios';

const Turnet = () => {
  const [turnet, setTurnet] = useState([]);
  const [form, setForm] = useState({ punetor_id: '', data: '', ora_fillimit: '', ora_perfundimit: '', shenimet: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await API.get('/turnet');
    setTurnet(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/turnet/${editId}`, form);
    } else {
      await API.post('/turnet', form);
    }
    setForm({ punetor_id: '', data: '', ora_fillimit: '', ora_perfundimit: '', shenimet: '' });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.turn_id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt?')) {
      await API.delete(`/turnet/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Turnet</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="Punetor ID" type="number" value={form.punetor_id} onChange={e => setForm({...form, punetor_id: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Data" type="date" value={form.data} onChange={e => setForm({...form, data: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Ora fillimit" type="time" value={form.ora_fillimit} onChange={e => setForm({...form, ora_fillimit: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Ora perfundimit" type="time" value={form.ora_perfundimit} onChange={e => setForm({...form, ora_perfundimit: e.target.value})} />
        <textarea className="border p-2 rounded col-span-2" placeholder="Shenimet" value={form.shenimet} onChange={e => setForm({...form, shenimet: e.target.value})} />
        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {editId ? 'Përditëso' : 'Shto'}
        </button>
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Punetor ID</th>
            <th className="p-3 text-left">Data</th>
            <th className="p-3 text-left">Ora fillimit</th>
            <th className="p-3 text-left">Ora perfundimit</th>
            <th className="p-3 text-left">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {turnet.map(item => (
            <tr key={item.turn_id} className="border-t">
              <td className="p-3">{item.punetor_id}</td>
              <td className="p-3">{item.data}</td>
              <td className="p-3">{item.ora_fillimit}</td>
              <td className="p-3">{item.ora_perfundimit}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Ndrysho</button>
                <button onClick={() => handleDelete(item.turn_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Turnet;