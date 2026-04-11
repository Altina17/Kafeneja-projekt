import { useState, useEffect } from 'react';
import API from '../api/axios';

const Porosite = () => {
  const [porosite, setPorosite] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({
    tavolina_id: '', kamarier_id: '', shuma_totale: '', statusi: '', metoda_pageses: ''
  });

  const fetchPorosite = async () => {
    const res = await API.get('/orders');
    setPorosite(res.data);
  };

  useEffect(() => {
    fetchPorosite();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editData) {
      await API.put(`/orders/${editData.porosi_id}`, form);
    } else {
      await API.post('/orders', form);
    }
    setForm({ tavolina_id: '', kamarier_id: '', shuma_totale: '', statusi: '', metoda_pageses: '' });
    setShowForm(false);
    setEditData(null);
    fetchPorosite();
  };

  const handleEdit = (porosi) => {
    setEditData(porosi);
    setForm(porosi);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A je i sigurt?')) {
      await API.delete(`/orders/${id}`);
      fetchPorosite();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Porositë</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditData(null); setForm({ tavolina_id: '', kamarier_id: '', shuma_totale: '', statusi: '', metoda_pageses: '' }); }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Shto Porosi
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-4">{editData ? 'Ndrysho Porosi' : 'Shto Porosi'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input className="border p-2 rounded" placeholder="Tavolina ID" value={form.tavolina_id} onChange={(e) => setForm({...form, tavolina_id: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Kamarier ID" value={form.kamarier_id} onChange={(e) => setForm({...form, kamarier_id: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Shuma Totale" type="number" value={form.shuma_totale} onChange={(e) => setForm({...form, shuma_totale: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Statusi" value={form.statusi} onChange={(e) => setForm({...form, statusi: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Metoda Pageses" value={form.metoda_pageses} onChange={(e) => setForm({...form, metoda_pageses: e.target.value})} />
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

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4">Tavolina</th>
              <th className="text-left p-4">Shuma</th>
              <th className="text-left p-4">Statusi</th>
              <th className="text-left p-4">Metoda</th>
              <th className="text-left p-4">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {porosite.map((p) => (
              <tr key={p.porosi_id} className="border-t">
                <td className="p-4">{p.tavolina_id}</td>
                <td className="p-4">{p.shuma_totale}€</td>
                <td className="p-4">{p.statusi}</td>
                <td className="p-4">{p.metoda_pageses}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEdit(p)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Ndrysho</button>
                  <button onClick={() => handleDelete(p.porosi_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Fshij</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Porosite;