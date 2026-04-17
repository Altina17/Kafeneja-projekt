import { useState, useEffect } from 'react';
import API from '../api/axios';

const Shpenzimet = () => {
  const [shpenzimet, setShpenzimet] = useState([]);
  const [form, setForm] = useState({ kategoria: '', pershkrimi: '', shuma: '', data: '', metoda_pageses: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await API.get('/shpenzimet');
    setShpenzimet(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/shpenzimet/${editId}`, form);
    } else {
      await API.post('/shpenzimet', form);
    }
    setForm({ kategoria: '', pershkrimi: '', shuma: '', data: '', metoda_pageses: '' });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.shpenzim_id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt?')) {
      await API.delete(`/shpenzimet/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shpenzimet</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="Kategoria" value={form.kategoria} onChange={e => setForm({...form, kategoria: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Pershkrimi" value={form.pershkrimi} onChange={e => setForm({...form, pershkrimi: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Shuma" type="number" value={form.shuma} onChange={e => setForm({...form, shuma: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Data" type="date" value={form.data} onChange={e => setForm({...form, data: e.target.value})} />
        <select className="border p-2 rounded col-span-2" value={form.metoda_pageses} onChange={e => setForm({...form, metoda_pageses: e.target.value})}>
          <option value="">Metoda pageses</option>
          <option value="cash">Cash</option>
          <option value="kartele">Kartele</option>
          <option value="transfer">Transfer</option>
        </select>
        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {editId ? 'Përditëso' : 'Shto'}
        </button>
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Kategoria</th>
            <th className="p-3 text-left">Pershkrimi</th>
            <th className="p-3 text-left">Shuma</th>
            <th className="p-3 text-left">Data</th>
            <th className="p-3 text-left">Metoda</th>
            <th className="p-3 text-left">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {shpenzimet.map(item => (
            <tr key={item.shpenzim_id} className="border-t">
              <td className="p-3">{item.kategoria}</td>
              <td className="p-3">{item.pershkrimi}</td>
              <td className="p-3">{item.shuma}€</td>
              <td className="p-3">{item.data}</td>
              <td className="p-3">{item.metoda_pageses}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Ndrysho</button>
                <button onClick={() => handleDelete(item.shpenzim_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shpenzimet;