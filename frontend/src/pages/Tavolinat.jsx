import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Tavolinat = () => {
  const [tavolinat, setTavolinat] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    numri: '',
    kapaciteti: '',
    vendndodhja: '',
    statusi: ''
  });

  const fetchData = async () => {
    try {
      const res = await API.get('/tables');
      setTavolinat(res.data);
    } catch (error) {
      toast.error('Gabim gjatë marrjes së të dhënave!');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/tables/${editId}`, form);
        toast.success('Tavolina u përditësua me sukses!');
      } else {
        await API.post('/tables', form);
        toast.success('Tavolina u shtua me sukses!');
      }

      setForm({
        numri: '',
        kapaciteti: '',
        vendndodhja: '',
        statusi: ''
      });

      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.tavolina_id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt që dëshironi ta fshini?')) {
      try {
        await API.delete(`/tables/${id}`);
        toast.success('Tavolina u fshi me sukses!');
        fetchData();
      } catch (error) {
        toast.error('Gabim gjatë fshirjes!');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tavolinat</h1>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm({
              numri: '',
              kapaciteti: '',
              vendndodhja: '',
              statusi: ''
            });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Shto Tavolinë
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
            <input
              className="border p-2 rounded"
              placeholder="Numri"
              type="number"
              value={form.numri}
              onChange={(e) => setForm({ ...form, numri: e.target.value })}
              required
            />

            <input
              className="border p-2 rounded"
              placeholder="Kapaciteti"
              type="number"
              value={form.kapaciteti}
              onChange={(e) => setForm({ ...form, kapaciteti: e.target.value })}
            />

            <input
              className="border p-2 rounded"
              placeholder="Vendndodhja"
              value={form.vendndodhja}
              onChange={(e) => setForm({ ...form, vendndodhja: e.target.value })}
            />

            <select
              className="border p-2 rounded"
              value={form.statusi}
              onChange={(e) => setForm({ ...form, statusi: e.target.value })}
            >
              <option value="">Statusi</option>
              <option value="e lire">E lirë</option>
              <option value="e zene">E zënë</option>
              <option value="rezervuar">Rezervuar</option>
            </select>

            <button
              type="submit"
              className="col-span-2 bg-green-600 text-white p-2 rounded"
            >
              {editId ? 'Përditëso' : 'Shto'}
            </button>
          </form>
        </div>
      )}

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Numri</th>
            <th className="p-3 text-left">Kapaciteti</th>
            <th className="p-3 text-left">Vendndodhja</th>
            <th className="p-3 text-left">Statusi</th>
            <th className="p-3 text-left">Veprimet</th>
          </tr>
        </thead>

        <tbody>
          {tavolinat.map((item) => (
            <tr key={item.tavolina_id} className="border-t">
              <td className="p-3">{item.numri}</td>
              <td className="p-3">{item.kapaciteti}</td>
              <td className="p-3">{item.vendndodhja}</td>
              <td className="p-3">{item.statusi}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Ndrysho
                </button>

                <button
                  onClick={() => handleDelete(item.tavolina_id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Fshi
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tavolinat;