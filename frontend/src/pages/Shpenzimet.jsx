import { useState, useEffect } from 'react';
import API from '../api/axios';

const Shpenzimet = () => {
  const [shpenzimet, setShpenzimet] = useState([]);
  const [kerkim, setKerkim] = useState('');
  const [filtriMetoda, setFiltriMetoda] = useState('');
  const [form, setForm] = useState({ kategoria: '', pershkrimi: '', shuma: '', data: '', metoda_pageses: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const res = await API.get('/shpenzimet');
    setShpenzimet(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const shpenzimetFiltruar = shpenzimet.filter(s => {
    const perputhetKerkim = s.kategoria?.toLowerCase().includes(kerkim.toLowerCase()) ||
      s.pershkrimi?.toLowerCase().includes(kerkim.toLowerCase());
    const perputhetMetoda = filtriMetoda === '' || s.metoda_pageses === filtriMetoda;
    return perputhetKerkim && perputhetMetoda;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/shpenzimet/${editId}`, form);
    } else {
      await API.post('/shpenzimet', form);
    }
    setForm({ kategoria: '', pershkrimi: '', shuma: '', data: '', metoda_pageses: '' });
    setEditId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.shpenzim_id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt?')) {
      await API.delete(`/shpenzimet/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shpenzimet</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ kategoria: '', pershkrimi: '', shuma: '', data: '', metoda_pageses: '' }); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Shto Shpenzim
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="🔍 Kërko shpenzim..." className="border p-2 rounded w-64" value={kerkim} onChange={e => setKerkim(e.target.value)} />
        <select className="border p-2 rounded" value={filtriMetoda} onChange={e => setFiltriMetoda(e.target.value)}>
          <option value="">Të gjitha metodat</option>
          <option value="cash">Cash</option>
          <option value="kartele">Kartele</option>
          <option value="transfer">Transfer</option>
        </select>
      </div>

      {showForm && (
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
          <div className="col-span-2 flex gap-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{editId ? 'Përditëso' : 'Shto'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Anulo</button>
          </div>
        </form>
      )}

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
          {shpenzimetFiltruar.length === 0 ? (
            <tr><td colSpan="6" className="p-4 text-center text-gray-500">Nuk u gjet asnjë shpenzim!</td></tr>
          ) : (
            shpenzimetFiltruar.map(item => (
              <tr key={item.shpenzim_id} className="border-t">
                <td className="p-3">{item.kategoria}</td>
                <td className="p-3">{item.pershkrimi}</td>
                <td className="p-3">{item.shuma}€</td>
                <td className="p-3">{item.data}</td>
                <td className="p-3">{item.metoda_pageses}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded">Ndrysho</button>
                  <button onClick={() => handleDelete(item.shpenzim_id)} className="bg-red-500 text-white px-3 py-1 rounded">Fshi</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Shpenzimet;