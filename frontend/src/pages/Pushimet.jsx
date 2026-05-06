import { useState, useEffect } from 'react';
import API from '../api/axios';

const Pushimet = () => {
  const [pushimet, setPushimet] = useState([]);
  const [punetoret, setPunetoret] = useState([]);
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
    if (editId) {
      await API.put(`/lejet/${editId}`, form);
    } else {
      await API.post('/lejet', form);
    }
    setForm({ punetor_id: '', data_fillimit: '', data_mbarimit: '', lloji: 'pushim', statusi: 'pritur', arsyeja: '' });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm({
      punetor_id:    item.punetor_id,
      data_fillimit: item.data_fillimit?.slice(0, 10),
      data_mbarimit: item.data_mbarimit?.slice(0, 10),
      lloji:         item.lloji,
      statusi:       item.statusi,
      arsyeja:       item.arsyeja || '',
    });
    setEditId(item.pushimi_id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt?')) {
      await API.delete(`/lejet/${id}`);
      fetchData();
    }
  };

  const statusNgjyra = (statusi) => {
    if (statusi === 'aprovuar') return 'bg-green-100 text-green-700';
    if (statusi === 'refuzuar') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div>
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

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Punonjësi</th>
            <th className="p-3 text-left">Lloji</th>
            <th className="p-3 text-left">Data fillimit</th>
            <th className="p-3 text-left">Data mbarimit</th>
            <th className="p-3 text-left">Statusi</th>
            <th className="p-3 text-left">Arsyeja</th>
            <th className="p-3 text-left">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {pushimet.map(item => (
            <tr key={item.pushimi_id} className="border-t">
              <td className="p-3">{item.emri} {item.mbiemri}</td>
              <td className="p-3">{item.lloji}</td>
              <td className="p-3">{item.data_fillimit?.slice(0, 10)}</td>
              <td className="p-3">{item.data_mbarimit?.slice(0, 10)}</td>
              <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusNgjyra(item.statusi)}`}>{item.statusi}</span></td>
              <td className="p-3">{item.arsyeja || '—'}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Ndrysho</button>
                <button onClick={() => handleDelete(item.pushimi_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pushimet;