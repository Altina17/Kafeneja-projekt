import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Punetoret = () => {
  const [punetoret, setPunetoret] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({
    emri: '', mbiemri: '', pozita: '', telefoni: '', email: '', data_punesimit: '', paga: '', turni: ''
  });

  const fetchPunetoret = async () => {
    const res = await API.get('/employees');
    setPunetoret(res.data);
  };

  useEffect(() => {
    fetchPunetoret();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await API.put(`/employees/${editData.punetor_id}`, form);
        toast.success(`Punetori "${form.emri} ${form.mbiemri}" u ndryshua me sukses!`);
      } else {
        await API.post('/employees', form);
        toast.success(`Punetori "${form.emri} ${form.mbiemri}" u shtua me sukses!`);
      }
      setForm({ emri: '', mbiemri: '', pozita: '', telefoni: '', email: '', data_punesimit: '', paga: '', turni: '' });
      setShowForm(false);
      setEditData(null);
      fetchPunetoret();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (punetor) => {
    setEditData(punetor);
    setForm(punetor);
    setShowForm(true);
  };

  const handleDelete = async (id, emri, mbiemri) => {
    if (window.confirm(`A je i sigurt që dëshiron të fshish "${emri} ${mbiemri}"?`)) {
      try {
        await API.delete(`/employees/${id}`);
        toast.success(`Punetori "${emri} ${mbiemri}" u fshi me sukses!`);
        fetchPunetoret();
      } catch (error) {
        toast.error('Ndodhi një gabim gjatë fshirjes!');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Punetoret</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditData(null); setForm({ emri: '', mbiemri: '', pozita: '', telefoni: '', email: '', data_punesimit: '', paga: '', turni: '' }); }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Shto Punetor
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-4">{editData ? 'Ndrysho Punetor' : 'Shto Punetor'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input className="border p-2 rounded" placeholder="Emri" value={form.emri} onChange={(e) => setForm({...form, emri: e.target.value})} required />
            <input className="border p-2 rounded" placeholder="Mbiemri" value={form.mbiemri} onChange={(e) => setForm({...form, mbiemri: e.target.value})} required />
            <input className="border p-2 rounded" placeholder="Pozita" value={form.pozita} onChange={(e) => setForm({...form, pozita: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Telefoni" value={form.telefoni} onChange={(e) => setForm({...form, telefoni: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Data Punesimit" type="date" value={form.data_punesimit} onChange={(e) => setForm({...form, data_punesimit: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Paga" type="number" value={form.paga} onChange={(e) => setForm({...form, paga: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Turni" value={form.turni} onChange={(e) => setForm({...form, turni: e.target.value})} />
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
              <th className="text-left p-2 text-sm">Mbiemri</th>
              <th className="text-left p-2 text-sm">Pozita</th>
              <th className="text-left p-2 text-sm">Telefoni</th>
              <th className="text-left p-2 text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {punetoret.map((p) => (
              <tr key={p.punetor_id} className="border-t">
                <td className="p-2 text-sm">{p.emri}</td>
                <td className="p-2 text-sm">{p.mbiemri}</td>
                <td className="p-2 text-sm">{p.pozita}</td>
                <td className="p-2 text-sm">{p.telefoni}</td>
                <td className="p-2">
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(p)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                    <button onClick={() => handleDelete(p.punetor_id, p.emri, p.mbiemri)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
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

export default Punetoret;