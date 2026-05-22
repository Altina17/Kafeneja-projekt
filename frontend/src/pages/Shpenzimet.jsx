import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Shpenzimet = () => {
  const [shpenzimet, setShpenzimet] = useState([]);
  const [kerkim, setKerkim] = useState('');
  const [filtriMetoda, setFiltriMetoda] = useState('');
  const [form, setForm] = useState({ kategoria: '', pershkrimi: '', shuma: '', data: '', metoda_pageses: 'cash' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null });

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
    try {
      if (editId) {
        await API.put(`/shpenzimet/${editId}`, form);
        toast.success('Shpenzimi u ndryshua me sukses!');
      } else {
        await API.post('/shpenzimet', form);
        toast.success('Shpenzimi u shtua me sukses!');
      }
      setForm({ kategoria: '', pershkrimi: '', shuma: '', data: '', metoda_pageses: 'cash' });
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (item) => {
    setForm({...item, data: item.data?.slice(0, 10)});
    setEditId(item.shpenzim_id);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/shpenzimet/${konfirmo.id}`);
      toast.success('Shpenzimi u fshi me sukses!');
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
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron ta fshish këtë shpenzim?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shpenzimet</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ kategoria: '', pershkrimi: '', shuma: '', data: '', metoda_pageses: 'cash' }); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Kategoria</label>
            <select className="border p-2 rounded w-full" value={form.kategoria} onChange={e => setForm({...form, kategoria: e.target.value})} required>
              <option value="">Zgjidh kategorinë</option>
              <option value="Qiraja">Qiraja</option>
              <option value="Pagat">Pagat</option>
              <option value="Furnizimi">Furnizimi</option>
              <option value="Mirembajtja">Mirëmbajtja</option>
              <option value="Komunaljet">Komunaljet</option>
              <option value="Tjeter">Tjetër</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Pershkrimi</label>
            <input className="border p-2 rounded w-full" placeholder="Pershkrimi" value={form.pershkrimi} onChange={e => setForm({...form, pershkrimi: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Shuma (€)</label>
            <input className="border p-2 rounded w-full" placeholder="0.00" type="number" step="0.01" value={form.shuma} onChange={e => setForm({...form, shuma: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Data</label>
            <input className="border p-2 rounded w-full" type="date" value={form.data} onChange={e => setForm({...form, data: e.target.value})} />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Metoda e Pagesës</label>
            <select className="border p-2 rounded w-full" value={form.metoda_pageses} onChange={e => setForm({...form, metoda_pageses: e.target.value})}>
              <option value="cash">Cash</option>
              <option value="kartele">Kartele</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
          <div className="col-span-2 flex gap-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">{editId ? 'Ruaj Ndryshimet' : 'Shto'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Anulo</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-sm">Kategoria</th>
              <th className="p-3 text-left text-sm">Pershkrimi</th>
              <th className="p-3 text-left text-sm">Shuma</th>
              <th className="p-3 text-left text-sm">Data</th>
              <th className="p-3 text-left text-sm">Metoda</th>
              <th className="p-3 text-left text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {shpenzimetFiltruar.length === 0 ? (
              <tr><td colSpan="6" className="p-4 text-center text-gray-500">Nuk u gjet asnjë shpenzim!</td></tr>
            ) : (
              shpenzimetFiltruar.map(item => (
                <tr key={item.shpenzim_id} className="border-t even:bg-gray-50">
                  <td className="p-3 text-sm">{item.kategoria}</td>
                  <td className="p-3 text-sm">{item.pershkrimi}</td>
                  <td className="p-3 text-sm">{item.shuma}€</td>
                  <td className="p-3 text-sm">{item.data?.slice(0, 10)}</td>
                  <td className="p-3 text-sm">{item.metoda_pageses}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                      <button onClick={() => setKonfirmo({ shfaq: true, id: item.shpenzim_id })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
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

export default Shpenzimet;