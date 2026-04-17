import { useState, useEffect } from 'react';
import API from '../api/axios';

const Punetoret = () => {
  const [punetoret, setPunetoret] = useState([]);
  const [form, setForm] = useState({ emri: '', mbiemri: '', pozita: '', telefoni: '', email: '', data_punesimit: '', paga: '', turni: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await API.get('/employees');
    setPunetoret(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/employees/${editId}`, form);
    } else {
      await API.post('/employees', form);
    }
    setForm({ emri: '', mbiemri: '', pozita: '', telefoni: '', email: '', data_punesimit: '', paga: '', turni: '' });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.punetor_id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt?')) {
      await API.delete(`/employees/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Punetoret</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="Emri" value={form.emri} onChange={e => setForm({...form, emri: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Mbiemri" value={form.mbiemri} onChange={e => setForm({...form, mbiemri: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Pozita" value={form.pozita} onChange={e => setForm({...form, pozita: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Telefoni" value={form.telefoni} onChange={e => setForm({...form, telefoni: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Data punesimit" type="date" value={form.data_punesimit} onChange={e => setForm({...form, data_punesimit: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Paga" type="number" value={form.paga} onChange={e => setForm({...form, paga: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Turni" value={form.turni} onChange={e => setForm({...form, turni: e.target.value})} />
        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {editId ? 'Përditëso' : 'Shto'}
        </button>
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Emri</th>
            <th className="p-3 text-left">Pozita</th>
            <th className="p-3 text-left">Telefoni</th>
            <th className="p-3 text-left">Paga</th>
            <th className="p-3 text-left">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {punetoret.map(item => (
            <tr key={item.punetor_id} className="border-t">
              <td className="p-3">{item.emri} {item.mbiemri}</td>
              <td className="p-3">{item.pozita}</td>
              <td className="p-3">{item.telefoni}</td>
              <td className="p-3">{item.paga}€</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Ndrysho</button>
                <button onClick={() => handleDelete(item.punetor_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Punetoret;