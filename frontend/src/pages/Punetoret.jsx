import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Punetoret = () => {
  const [punetoret, setPunetoret] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const [form, setForm] = useState({
    emri: '',
    mbiemri: '',
    pozita: '',
    telefoni: '',
    email: '',
    data_punesimit: '',
    paga: '',
    turni: ''
  });

  // FETCH
  const fetchPunetoret = async () => {
    try {
      const res = await API.get('/employees');
      setPunetoret(res.data);
    } catch (err) {
      toast.error('Gabim gjatë marrjes së të dhënave!');
    }
  };

  useEffect(() => {
    fetchPunetoret();
  }, []);

  // SUBMIT (ADD / EDIT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editData) {
        await API.put(`/employees/${editData.punetor_id}`, form);
        toast.success(`Punëtori "${form.emri} ${form.mbiemri}" u përditësua!`);
      } else {
        await API.post('/employees', form);
        toast.success(`Punëtori "${form.emri} ${form.mbiemri}" u shtua!`);
      }

      resetForm();
      fetchPunetoret();

    } catch (err) {
      toast.error('Gabim gjatë ruajtjes!');
    }
  };

  // EDIT
  const handleEdit = (p) => {
    setEditData(p);
    setForm({
      emri: p.emri || '',
      mbiemri: p.mbiemri || '',
      pozita: p.pozita || '',
      telefoni: p.telefoni || '',
      email: p.email || '',
      data_punesimit: p.data_punesimit?.split('T')[0] || '',
      paga: p.paga || '',
      turni: p.turni || ''
    });
    setShowForm(true);
  };

  // DELETE
  const handleDelete = async (id, emri, mbiemri) => {
    if (window.confirm(`A je i sigurt që dëshiron të fshish "${emri} ${mbiemri}"?`)) {
      try {
        await API.delete(`/employees/${id}`);
        toast.success(`Punëtori "${emri} ${mbiemri}" u fshi!`);
        fetchPunetoret();
      } catch {
        toast.error('Gabim gjatë fshirjes!');
      }
    }
  };

  // RESET
  const resetForm = () => {
    setForm({
      emri: '',
      mbiemri: '',
      pozita: '',
      telefoni: '',
      email: '',
      data_punesimit: '',
      paga: '',
      turni: ''
    });
    setEditData(null);
    setShowForm(false);
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Punëtorët</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditData(null);
            resetForm();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Shto Punëtor
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-4">
            {editData ? 'Ndrysho Punëtor' : 'Shto Punëtor'}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            <input className="border p-2 rounded"
              placeholder="Emri"
              value={form.emri}
              onChange={e => setForm({...form, emri: e.target.value})}
              required
            />

            <input className="border p-2 rounded"
              placeholder="Mbiemri"
              value={form.mbiemri}
              onChange={e => setForm({...form, mbiemri: e.target.value})}
              required
            />

            <input className="border p-2 rounded"
              placeholder="Pozita"
              value={form.pozita}
              onChange={e => setForm({...form, pozita: e.target.value})}
            />

            <input className="border p-2 rounded"
              placeholder="Telefoni"
              value={form.telefoni}
              onChange={e => setForm({...form, telefoni: e.target.value})}
            />

            <input className="border p-2 rounded"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
            />

            <input type="date" className="border p-2 rounded"
              value={form.data_punesimit}
              onChange={e => setForm({...form, data_punesimit: e.target.value})}
            />

            <input type="number" className="border p-2 rounded"
              placeholder="Paga"
              value={form.paga}
              onChange={e => setForm({...form, paga: e.target.value})}
            />

            <input className="border p-2 rounded"
              placeholder="Turni"
              value={form.turni}
              onChange={e => setForm({...form, turni: e.target.value})}
            />

            <div className="col-span-2 flex gap-2">
              <button type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                {editData ? 'Ruaj Ndryshimet' : 'Shto'}
              </button>

              <button type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                Anulo
              </button>
            </div>

          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Emri</th>
              <th className="p-2 text-left">Mbiemri</th>
              <th className="p-2 text-left">Pozita</th>
              <th className="p-2 text-left">Telefoni</th>
              <th className="p-2 text-left">Paga</th>
              <th className="p-2 text-left">Veprimet</th>
            </tr>
          </thead>

          <tbody>
            {punetoret.map((p) => (
              <tr key={p.punetor_id} className="border-t">
                <td className="p-2">{p.emri}</td>
                <td className="p-2">{p.mbiemri}</td>
                <td className="p-2">{p.pozita}</td>
                <td className="p-2">{p.telefoni}</td>
                <td className="p-2">{p.paga}€</td>

                <td className="p-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded text-sm"
                    >
                      Ndrysho
                    </button>

                    <button
                      onClick={() => handleDelete(p.punetor_id, p.emri, p.mbiemri)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Fshij
                    </button>
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