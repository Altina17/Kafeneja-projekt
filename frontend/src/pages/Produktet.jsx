import { useState, useEffect } from 'react';
import API from '../api/axios';

const Produktet = () => {
  const [produktet, setProduktet] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({
    emri: '', kategoria_id: '', pershkrimi: '', cmimi: '', statusi: '', foto: ''
  });

  const fetchProduktet = async () => {
    const res = await API.get('/products');
    setProduktet(res.data);
  };

  useEffect(() => {
    fetchProduktet();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editData) {
      await API.put(`/products/${editData.produkt_id}`, form);
    } else {
      await API.post('/products', form);
    }
    setForm({ emri: '', kategoria_id: '', pershkrimi: '', cmimi: '', statusi: '', foto: '' });
    setShowForm(false);
    setEditData(null);
    fetchProduktet();
  };

  const handleEdit = (produkt) => {
    setEditData(produkt);
    setForm(produkt);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A je i sigurt?')) {
      await API.delete(`/products/${id}`);
      fetchProduktet();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produktet</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditData(null); setForm({ emri: '', kategoria_id: '', pershkrimi: '', cmimi: '', statusi: '', foto: '' }); }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Shto Produkt
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-4">{editData ? 'Ndrysho Produkt' : 'Shto Produkt'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input className="border p-2 rounded" placeholder="Emri" value={form.emri} onChange={(e) => setForm({...form, emri: e.target.value})} required />
            <input className="border p-2 rounded" placeholder="Cmimi" type="number" value={form.cmimi} onChange={(e) => setForm({...form, cmimi: e.target.value})} required />
            <input className="border p-2 rounded" placeholder="Pershkrimi" value={form.pershkrimi} onChange={(e) => setForm({...form, pershkrimi: e.target.value})} />
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
              <th className="text-left p-2 text-sm">Emri</th>
              <th className="text-left p-2 text-sm">Cmimi</th>
              <th className="text-left p-2 text-sm">Statusi</th>
              <th className="text-left p-2 text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {produktet.map((p) => (
              <tr key={p.produkt_id} className="border-t">
                <td className="p-2 text-sm">{p.emri}</td>
                <td className="p-2 text-sm">{p.cmimi}€</td>
                <td className="p-2 text-sm">{p.statusi}</td>
                <td className="p-2">
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(p)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                    <button onClick={() => handleDelete(p.produkt_id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Produktet;