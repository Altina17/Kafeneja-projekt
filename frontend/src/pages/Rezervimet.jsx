import { useState, useEffect } from 'react';
import API from '../api/axios';

const Rezervimet = () => {
  const [rezervimet, setRezervimet] = useState([]);
  const [form, setForm] = useState({ emri_klientit: '', telefoni: '', tavolina_id: '', data: '', ora: '', numri_personave: '', statusi: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await API.get('/rezervimet');
    setRezervimet(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/rezervimet/${editId}`, form);
    } else {
      await API.post('/rezervimet', form);
    }
    setForm({ emri_klientit: '', telefoni: '', tavolina_id: '', data: '', ora: '', numri_personave: '', statusi: '' });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.rezervim_id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt?')) {
      await API.delete(`/rezervimet/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Rezervimet</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="Emri klientit" value={form.emri_klientit} onChange={e => setForm({...form, emri_klientit: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Telefoni" value={form.telefoni} onChange={e => setForm({...form, telefoni: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Tavolina ID" type="number" value={form.tavolina_id} onChange={e => setForm({...form, tavolina_id: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Data" type="date" value={form.data} onChange={e => setForm({...form, data: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Ora" type="time" value={form.ora} onChange={e => setForm({...form, ora: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Numri personave" type="number" value={form.numri_personave} onChange={e => setForm({...form, numri_personave: e.target.value})} />
        <select className="border p-2 rounded col-span-2" value={form.statusi} onChange={e => setForm({...form, statusi: e.target.value})}>
          <option value="">Zgjidh statusin</option>
          <option value="aktive">Aktive</option>
          <option value="anuluar">Anuluar</option>
          <option value="perfunduar">Përfunduar</option>
        </select>
        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {editId ? 'Përditëso' : 'Shto'}
        </button>
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Klienti</th>
            <th className="p-3 text-left">Telefoni</th>
            <th className="p-3 text-left">Data</th>
            <th className="p-3 text-left">Ora</th>
            <th className="p-3 text-left">Statusi</th>
            <th className="p-3 text-left">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {rezervimet.map(item => (
            <tr key={item.rezervim_id} className="border-t">
              <td className="p-3">{item.emri_klientit}</td>
              <td className="p-3">{item.telefoni}</td>
              <td className="p-3">{item.data}</td>
              <td className="p-3">{item.ora}</td>
              <td className="p-3">{item.statusi}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Ndrysho</button>
                <button onClick={() => handleDelete(item.rezervim_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rezervimet;