import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Pushimet = () => {
  const [pushimet, setPushimet] = useState([]);
  const [punetoret, setPunetoret] = useState([]);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null });
  const [form, setForm] = useState({ punetor_id: '', data_fillimit: '', data_mbarimit: '', lloji: 'pushim', statusi: 'pritur', arsyeja: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await API.get('/lejet');
    setPushimet(res.data);
  };

  useEffect(() => {
    fetchData();
    API.get('/employees').then(r => setPunetoret(r.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/lejet/${editId}`, form);
        toast.success('Pushimi u ndryshua me sukses!');
      } else {
        await API.post('/lejet', form);
        toast.success('Pushimi u shtua me sukses!');
      }
      setForm({ punetor_id: '', data_fillimit: '', data_mbarimit: '', lloji: 'pushim', statusi: 'pritur', arsyeja: '' });
      setEditId(null);
      fetchData();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (item) => {
    setForm({
      punetor_id: item.punetor_id,
      data_fillimit: item.data_fillimit?.slice(0, 10),
      data_mbarimit: item.data_mbarimit?.slice(0, 10),
      lloji: item.lloji,
      statusi: item.statusi,
      arsyeja: item.arsyeja || '',
    });
    setEditId(item.leja_id);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/lejet/${konfirmo.id}`);
      toast.success('Pushimi u fshi me sukses!');
      setKonfirmo({ shfaq: false, id: null });
      fetchData();
    } catch (error) {
      toast.error('Gabim gjatë fshirjes!');
    }
  };

  const statusNgjyra = (statusi) => {
    if (statusi === 'aprovuar') return 'bg-green-100 text-green-700';
    if (statusi === 'refuzuar') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div>
      {konfirmo.shfaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-bold mb-2">Konfirmo Fshirjen</h3>
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron ta fshish këtë pushim?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Pushimet e Punonjësve</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <select className="border p-2 rounded" value={form.punetor_id} onChange={e => setForm({ ...form, punetor_id: e.target.value })} required>
          <option value="">-- Zgjedh Punonjësin --</option>
          {punetoret.map(p => (
            <option key={p.punetor_id} value={p.punetor_id}>{p.emri} {p.mbiemri}</option>
          ))}
        </select>
        <select className="border p-2 rounded" value={form.lloji} onChange={e => setForm({ ...form, lloji: e.target.value })}>
          <option value="pushim">Pushim</option>
          <option value="sëmundje">Sëmundje</option>
          <option value="maternitet">Maternitet</option>
          <option value="tjeter">Tjetër</option>
        </select>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Data e fillimit</label>
          <input type="date" className="border p-2 rounded w-full" value={form.data_fillimit} onChange={e => setForm({ ...form, data_fillimit: e.target.value })} required />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Data e mbarimit</label>
          <input type="date" className="border p-2 rounded w-full" value={form.data_mbarimit} onChange={e => setForm({ ...form, data_mbarimit: e.target.value })} required />
        </div>
        <select className="border p-2 rounded" value={form.statusi} onChange={e => setForm({ ...form, statusi: e.target.value })}>
          <option value="pritur">Pritur</option>
          <option value="aprovuar">Aprovuar</option>
          <option value="refuzuar">Refuzuar</option>
        </select>
        <input className="border p-2 rounded" placeholder="Arsyeja (opsionale)" value={form.arsyeja} onChange={e => setForm({ ...form, arsyeja: e.target.value })} />
        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {editId ? 'Përditëso' : 'Shto'}
        </button>
      </form>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-sm">Punonjësi</th>
              <th className="p-3 text-left text-sm">Lloji</th>
              <th className="p-3 text-left text-sm">Data fillimit</th>
              <th className="p-3 text-left text-sm">Data mbarimit</th>
              <th className="p-3 text-left text-sm">Statusi</th>
              <th className="p-3 text-left text-sm">Arsyeja</th>
              <th className="p-3 text-left text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {pushimet.length === 0 ? (
              <tr><td colSpan="7" className="p-4 text-center text-gray-500">Nuk ka pushime!</td></tr>
            ) : (
              pushimet.map(item => (
                <tr key={item.leja_id} className="border-t even:bg-gray-50">
                  <td className="p-3 text-sm">{item.emri} {item.mbiemri}</td>
                  <td className="p-3 text-sm">{item.lloji}</td>
                  <td className="p-3 text-sm">{item.data_fillimit?.slice(0, 10)}</td>
                  <td className="p-3 text-sm">{item.data_mbarimit?.slice(0, 10)}</td>
                  <td className="p-3 text-sm"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusNgjyra(item.statusi)}`}>{item.statusi}</span></td>
                  <td className="p-3 text-sm">{item.arsyeja || '—'}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                      <button onClick={() => setKonfirmo({ shfaq: true, id: item.leja_id })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
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

export default Pushimet;