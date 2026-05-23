import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const DetajetPorosise = () => {
  const [detajet, setDetajet] = useState([]);
  const [porosite, setPorosite] = useState([]);
  const [produktet, setProduktet] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null });
  const [filtriPorosi, setFiltriPorosi] = useState('');
  const [form, setForm] = useState({
    porosi_id: '', produkt_id: '', sasia: '', cmimi_njesi: '', cmimi_total: '', shenimet: ''
  });

  const fetchDetajet = async () => {
    const res = await API.get('/detajet-porosise');
    setDetajet(res.data);
  };

  useEffect(() => {
    fetchDetajet();
    API.get('/orders').then(r => setPorosite(r.data));
    API.get('/products').then(r => setProduktet(r.data));
  }, []);

  const emriProduktit = (id) => {
    const p = produktet.find(p => p.produkt_id === id);
    return p ? p.emri : id;
  };

  const emriPorosise = (id) => {
    const p = porosite.find(p => p.porosi_id === id);
    return p ? `Porosi #${p.porosi_id}` : id;
  };

  // Kur zgjedh produktin - llogarit cmimin automatikisht
  const handleProduktChange = (produkt_id) => {
    const produkti = produktet.find(p => p.produkt_id == produkt_id);
    const cmimi_njesi = produkti ? produkti.cmimi : '';
    const cmimi_total = cmimi_njesi && form.sasia ? (cmimi_njesi * form.sasia).toFixed(2) : '';
    setForm({ ...form, produkt_id, cmimi_njesi, cmimi_total });
  };

  // Kur ndryshon sasia - llogarit cmimin total automatikisht
  const handleSasiaChange = (sasia) => {
    const cmimi_total = form.cmimi_njesi && sasia ? (form.cmimi_njesi * sasia).toFixed(2) : '';
    setForm({ ...form, sasia, cmimi_total });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await API.put(`/detajet-porosise/${editData.detal_id}`, form);
        toast.success('Detali u ndryshua me sukses!');
      } else {
        await API.post('/detajet-porosise', form);
        toast.success('Detali u shtua me sukses!');
      }
      setForm({ porosi_id: '', produkt_id: '', sasia: '', cmimi_njesi: '', cmimi_total: '', shenimet: '' });
      setShowForm(false);
      setEditData(null);
      fetchDetajet();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setForm(item);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/detajet-porosise/${konfirmo.id}`);
      toast.success('Detali u fshi me sukses!');
      setKonfirmo({ shfaq: false, id: null });
      fetchDetajet();
    } catch (error) {
      toast.error('Gabim gjatë fshirjes!');
    }
  };

  const detajetFiltruar = detajet.filter(d =>
    filtriPorosi === '' || d.porosi_id?.toString() === filtriPorosi
  );

  return (
    <div>
      {/* Modal konfirmimi */}
      {konfirmo.shfaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-bold mb-2">Konfirmo Fshirjen</h3>
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron ta fshish këtë detal?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detajet e Porosive</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditData(null); setForm({ porosi_id: '', produkt_id: '', sasia: '', cmimi_njesi: '', cmimi_total: '', shenimet: '' }); }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Shto Detal
        </button>
      </div>

      {/* Filtri */}
      <div className="flex gap-3 mb-4">
        <select className="border p-2 rounded w-64" value={filtriPorosi} onChange={e => setFiltriPorosi(e.target.value)}>
          <option value="">Të gjitha porositë</option>
          {porosite.map(p => (
            <option key={p.porosi_id} value={p.porosi_id}>Porosi #{p.porosi_id}</option>
          ))}
        </select>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-4">{editData ? 'Ndrysho Detal' : 'Shto Detal'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Porosia</label>
              <select className="border p-2 rounded w-full" value={form.porosi_id} onChange={(e) => setForm({...form, porosi_id: e.target.value})} required>
                <option value="">Zgjidh porosinë</option>
                {porosite.map(p => (
                  <option key={p.porosi_id} value={p.porosi_id}>Porosi #{p.porosi_id}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Produkti</label>
              <select className="border p-2 rounded w-full" value={form.produkt_id} onChange={(e) => handleProduktChange(e.target.value)} required>
                <option value="">Zgjidh produktin</option>
                {produktet.map(p => (
                  <option key={p.produkt_id} value={p.produkt_id}>{p.emri} - {p.cmimi}€</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Sasia</label>
              <input className="border p-2 rounded w-full" placeholder="1" type="number" min="1" value={form.sasia} onChange={(e) => handleSasiaChange(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Cmimi Njësi (€)</label>
              <input className="border p-2 rounded w-full bg-gray-50" type="number" step="0.01" value={form.cmimi_njesi} onChange={(e) => setForm({...form, cmimi_njesi: e.target.value})} readOnly />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Cmimi Total (€)</label>
              <input className="border p-2 rounded w-full bg-gray-50" type="number" step="0.01" value={form.cmimi_total} readOnly />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Shënimet</label>
              <input className="border p-2 rounded w-full" placeholder="Shënimet (opsionale)" value={form.shenimet} onChange={(e) => setForm({...form, shenimet: e.target.value})} />
            </div>

            <div className="col-span-2 flex gap-2">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">{editData ? 'Ruaj Ndryshimet' : 'Shto'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Anulo</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 text-sm">Porosia</th>
              <th className="text-left p-2 text-sm">Produkti</th>
              <th className="text-left p-2 text-sm">Sasia</th>
              <th className="text-left p-2 text-sm">Cmimi Njësi</th>
              <th className="text-left p-2 text-sm">Cmimi Total</th>
              <th className="text-left p-2 text-sm">Shënimet</th>
              <th className="text-left p-2 text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {detajetFiltruar.length === 0 ? (
              <tr><td colSpan="7" className="p-4 text-center text-gray-500">Nuk ka detaje!</td></tr>
            ) : (
              detajetFiltruar.map((d) => (
                <tr key={d.detal_id} className="border-t even:bg-gray-50">
                  <td className="p-2 text-sm">{emriPorosise(d.porosi_id)}</td>
                  <td className="p-2 text-sm">{d.produkt_emri || emriProduktit(d.produkt_id)}</td>
                  <td className="p-2 text-sm">{d.sasia}</td>
                  <td className="p-2 text-sm">{d.cmimi_njesi}€</td>
                  <td className="p-2 text-sm">{d.cmimi_total}€</td>
                  <td className="p-2 text-sm">{d.shenimet || '—'}</td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(d)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                      <button onClick={() => setKonfirmo({ shfaq: true, id: d.detal_id })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
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

export default DetajetPorosise;