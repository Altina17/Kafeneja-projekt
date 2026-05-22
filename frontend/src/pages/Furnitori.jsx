import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Furnitori = () => {
  const [furnitoret, setFurnitoret] = useState([]);
  const [kerkim, setKerkim] = useState('');
  const [form, setForm] = useState({ emri: '', personi_kontaktit: '', telefoni: '', email: '', adresa: '', lloji_produkteve: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null });

  const fetchData = async () => {
    const res = await API.get('/furnitoret');
    setFurnitoret(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const furnitoretFiltruar = furnitoret.filter(f =>
    f.emri?.toLowerCase().includes(kerkim.toLowerCase()) ||
    f.lloji_produkteve?.toLowerCase().includes(kerkim.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/furnitoret/${editId}`, form);
        toast.success('Furnitori u ndryshua me sukses!');
      } else {
        await API.post('/furnitoret', form);
        toast.success('Furnitori u shtua me sukses!');
      }
      setForm({ emri: '', personi_kontaktit: '', telefoni: '', email: '', adresa: '', lloji_produkteve: '' });
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.furnitor_id);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/furnitoret/${konfirmo.id}`);
      toast.success('Furnitori u fshi me sukses!');
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
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron ta fshish këtë furnitor?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Furnitoret</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ emri: '', personi_kontaktit: '', telefoni: '', email: '', adresa: '', lloji_produkteve: '' }); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Shto Furnitor
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="🔍 Kërko furnitor..." className="border p-2 rounded w-64" value={kerkim} onChange={e => setKerkim(e.target.value)} />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Emri</label>
            <input className="border p-2 rounded w-full" placeholder="Emri furnitorit" value={form.emri} onChange={e => setForm({...form, emri: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Personi Kontaktit</label>
            <input className="border p-2 rounded w-full" placeholder="Personi kontaktit" value={form.personi_kontaktit} onChange={e => setForm({...form, personi_kontaktit: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Telefoni</label>
            <input className="border p-2 rounded w-full" placeholder="Telefoni" value={form.telefoni} onChange={e => setForm({...form, telefoni: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input className="border p-2 rounded w-full" placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Adresa</label>
            <input className="border p-2 rounded w-full" placeholder="Adresa" value={form.adresa} onChange={e => setForm({...form, adresa: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Lloji Produkteve</label>
            <select className="border p-2 rounded w-full" value={form.lloji_produkteve} onChange={e => setForm({...form, lloji_produkteve: e.target.value})}>
              <option value="">Zgjidh llojin</option>
              <option value="Pije">Pije</option>
              <option value="Ushqim">Ushqim</option>
              <option value="Pastrimi">Pastrimi</option>
              <option value="Pajisje">Pajisje</option>
              <option value="Tjeter">Tjetër</option>
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
              <th className="p-3 text-left text-sm">Emri</th>
              <th className="p-3 text-left text-sm">Kontakti</th>
              <th className="p-3 text-left text-sm">Telefoni</th>
              <th className="p-3 text-left text-sm">Email</th>
              <th className="p-3 text-left text-sm">Lloji</th>
              <th className="p-3 text-left text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {furnitoretFiltruar.length === 0 ? (
              <tr><td colSpan="6" className="p-4 text-center text-gray-500">Nuk u gjet asnjë furnitor!</td></tr>
            ) : (
              furnitoretFiltruar.map(item => (
                <tr key={item.furnitor_id} className="border-t even:bg-gray-50">
                  <td className="p-3 text-sm">{item.emri}</td>
                  <td className="p-3 text-sm">{item.personi_kontaktit}</td>
                  <td className="p-3 text-sm">{item.telefoni}</td>
                  <td className="p-3 text-sm">{item.email}</td>
                  <td className="p-3 text-sm">{item.lloji_produkteve}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                      <button onClick={() => setKonfirmo({ shfaq: true, id: item.furnitor_id })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
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

export default Furnitori;