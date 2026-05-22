import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Turnet = () => {
  const [turnet, setTurnet] = useState([]);
  const [punetoret, setPunetoret] = useState([]);
  const [kerkim, setKerkim] = useState('');
  const [filtriData, setFiltriData] = useState('');
  const [form, setForm] = useState({ punetor_id: '', data: '', ora_fillimit: '', ora_perfundimit: '', shenimet: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null });

  const fetchData = async () => {
    const res = await API.get('/turnet');
    setTurnet(res.data);
  };

  useEffect(() => {
    fetchData();
    API.get('/employees').then(r => setPunetoret(r.data));
  }, []);

  const emriPunetorit = (id) => {
    const p = punetoret.find(p => p.punetor_id === id);
    return p ? `${p.emri} ${p.mbiemri}` : id;
  };

  const turnetFiltruar = turnet.filter(t => {
    const punetori = punetoret.find(p => p.punetor_id === t.punetor_id);
    const emri = punetori ? `${punetori.emri} ${punetori.mbiemri}`.toLowerCase() : '';
    const perputhetKerkim = emri.includes(kerkim.toLowerCase());
    const perputhetData = filtriData === '' || t.data?.slice(0, 10) === filtriData;
    return perputhetKerkim && perputhetData;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/turnet/${editId}`, form);
        toast.success('Turni u ndryshua me sukses!');
      } else {
        await API.post('/turnet', form);
        toast.success('Turni u shtua me sukses!');
      }
      setForm({ punetor_id: '', data: '', ora_fillimit: '', ora_perfundimit: '', shenimet: '' });
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (item) => {
    setForm({...item, data: item.data?.slice(0, 10)});
    setEditId(item.turn_id);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/turnet/${konfirmo.id}`);
      toast.success('Turni u fshi me sukses!');
      setKonfirmo({ shfaq: false, id: null });
      fetchData();
    } catch (error) {
      toast.error('Gabim gjatë fshirjes!');
    }
  };

  return (
    <div>
      {/* Modal konfirmimi */}
      {konfirmo.shfaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-bold mb-2">Konfirmo Fshirjen</h3>
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron ta fshish këtë turn?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Turnet</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ punetor_id: '', data: '', ora_fillimit: '', ora_perfundimit: '', shenimet: '' }); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Shto Turn
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="🔍 Kërko punetor..." className="border p-2 rounded w-64" value={kerkim} onChange={e => setKerkim(e.target.value)} />
        <input type="date" className="border p-2 rounded" value={filtriData} onChange={e => setFiltriData(e.target.value)} />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Punetori</label>
            <select className="border p-2 rounded w-full" value={form.punetor_id} onChange={e => setForm({...form, punetor_id: e.target.value})} required>
              <option value="">Zgjidh punetorin</option>
              {punetoret.map(p => (
                <option key={p.punetor_id} value={p.punetor_id}>{p.emri} {p.mbiemri} - {p.pozita}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Data</label>
            <input className="border p-2 rounded w-full" type="date" value={form.data} onChange={e => setForm({...form, data: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Ora fillimit</label>
            <input className="border p-2 rounded w-full" type="time" value={form.ora_fillimit} onChange={e => setForm({...form, ora_fillimit: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Ora përfundimit</label>
            <input className="border p-2 rounded w-full" type="time" value={form.ora_perfundimit} onChange={e => setForm({...form, ora_perfundimit: e.target.value})} />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Shënimet</label>
            <textarea className="border p-2 rounded w-full" placeholder="Shënimet (opsionale)" value={form.shenimet} onChange={e => setForm({...form, shenimet: e.target.value})} />
          </div>
          <div className="col-span-2 flex gap-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">{editId ? 'Ruaj Ndryshimet' : 'Shto'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Anulo</button>
          </div>
        </form>
      )}

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left text-sm">Punetori</th>
            <th className="p-3 text-left text-sm">Data</th>
            <th className="p-3 text-left text-sm">Ora fillimit</th>
            <th className="p-3 text-left text-sm">Ora përfundimit</th>
            <th className="p-3 text-left text-sm">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {turnetFiltruar.length === 0 ? (
            <tr><td colSpan="5" className="p-4 text-center text-gray-500">Nuk u gjet asnjë turn!</td></tr>
          ) : (
            turnetFiltruar.map(item => (
              <tr key={item.turn_id} className="border-t even:bg-gray-50">
                <td className="p-3 text-sm">{emriPunetorit(item.punetor_id)}</td>
                <td className="p-3 text-sm">{item.data?.slice(0, 10)}</td>
                <td className="p-3 text-sm">{item.ora_fillimit}</td>
                <td className="p-3 text-sm">{item.ora_perfundimit}</td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                    <button onClick={() => setKonfirmo({ shfaq: true, id: item.turn_id })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Turnet;