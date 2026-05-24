import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Punetoret = () => {
  const [punetoret, setPunetoret] = useState([]);
  const [kerkim, setKerkim] = useState('');
  const [filtriPozita, setFiltriPozita] = useState('');
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null });
  const [form, setForm] = useState({ emri: '', mbiemri: '', pozita: '', telefoni: '', email: '', data_punesimit: '', paga: '', turni: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const res = await API.get('/employees');
    setPunetoret(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const punetoretFiltruar = punetoret.filter(p => {
    const perputhetKerkim = `${p.emri} ${p.mbiemri}`.toLowerCase().includes(kerkim.toLowerCase());
    const perputhetPozita = filtriPozita === '' || p.pozita?.toLowerCase().includes(filtriPozita.toLowerCase());
    return perputhetKerkim && perputhetPozita;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/employees/${editId}`, form);
        toast.success('Punetori u ndryshua me sukses!');
      } else {
        await API.post('/employees', form);
        toast.success('Punetori u shtua me sukses!');
      }
      setForm({ emri: '', mbiemri: '', pozita: '', telefoni: '', email: '', data_punesimit: '', paga: '', turni: '' });
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (item) => {
    setForm({...item, data_punesimit: item.data_punesimit?.slice(0, 10)});
    setEditId(item.punetor_id);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/employees/${konfirmo.id}`);
      toast.success('Punetori u fshi me sukses!');
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
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron ta fshish këtë punetor?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Punetoret</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ emri: '', mbiemri: '', pozita: '', telefoni: '', email: '', data_punesimit: '', paga: '', turni: '' }); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Shto Punetor
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="🔍 Kërko punetor..." className="border p-2 rounded w-64" value={kerkim} onChange={e => setKerkim(e.target.value)} />
        <input type="text" placeholder="Filtro pozitën..." className="border p-2 rounded w-48" value={filtriPozita} onChange={e => setFiltriPozita(e.target.value)} />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Emri</label>
            <input className="border p-2 rounded w-full" placeholder="Emri" value={form.emri} onChange={e => setForm({...form, emri: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Mbiemri</label>
            <input className="border p-2 rounded w-full" placeholder="Mbiemri" value={form.mbiemri} onChange={e => setForm({...form, mbiemri: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Pozita</label>
            <select className="border p-2 rounded w-full" value={form.pozita} onChange={e => setForm({...form, pozita: e.target.value})}>
              <option value="">Zgjidh pozitën</option>
              <option value="Kamarier">Kamarier</option>
              <option value="Kasiер">Kasier</option>
              <option value="Kuzhinier">Kuzhinier</option>
              <option value="Menaxher">Menaxher</option>
              <option value="Pastrues">Pastrues</option>
              <option value="Tjeter">Tjetër</option>
            </select>
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
            <label className="block text-sm font-medium text-gray-600 mb-1">Data Punësimit</label>
            <input className="border p-2 rounded w-full" type="date" value={form.data_punesimit} onChange={e => setForm({...form, data_punesimit: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Paga (€)</label>
            <input className="border p-2 rounded w-full" placeholder="Paga" type="number" value={form.paga} onChange={e => setForm({...form, paga: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Turni</label>
            <select className="border p-2 rounded w-full" value={form.turni} onChange={e => setForm({...form, turni: e.target.value})}>
              <option value="">Zgjidh turnin</option>
              <option value="mengjes">Mëngjes</option>
              <option value="pasdite">Pasdite</option>
              <option value="nate">Natë</option>
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
              <th className="p-3 text-left text-sm">Pozita</th>
              <th className="p-3 text-left text-sm">Telefoni</th>
              <th className="p-3 text-left text-sm">Paga</th>
              <th className="p-3 text-left text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {punetoretFiltruar.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">Nuk u gjet asnjë punetor!</td></tr>
            ) : (
              punetoretFiltruar.map(item => (
                <tr key={item.punetor_id} className="border-t even:bg-gray-50">
                  <td className="p-3 text-sm">{item.emri} {item.mbiemri}</td>
                  <td className="p-3 text-sm">{item.pozita}</td>
                  <td className="p-3 text-sm">{item.telefoni}</td>
                  <td className="p-3 text-sm">{item.paga}€</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                      <button onClick={() => setKonfirmo({ shfaq: true, id: item.punetor_id })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
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

export default Punetoret;