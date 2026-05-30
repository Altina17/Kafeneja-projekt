import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';
import espressoImg from '../images/espresso.jfif';
import icecoffeImg from '../images/icecoffe.jpg';
import cheesecakeImg from '../images/cheesecake.jfif';
import burgerImg from '../images/burger.jfif';

const imazhetLokale = {
  'espresso': espressoImg,
  'icecoffe': icecoffeImg,
  'cheesecake': cheesecakeImg,
  'burger': burgerImg,
};

const Produktet = () => {
  const [produktet, setProduktet] = useState([]);
  const [kategorite, setKategorite] = useState([]);
  const [kerkim, setKerkim] = useState('');
  const [filtriStatusi, setFiltriStatusi] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [konfirmo, setKonfirmo] = useState({ shfaq: false, id: null, emri: '' });
  const [form, setForm] = useState({
    emri: '', kategoria_id: '', pershkrimi: '', cmimi: '', statusi: 'aktiv', foto: ''
  });

  const fetchProduktet = async () => {
    const res = await API.get('/products');
    setProduktet(res.data);
  };

  const fetchKategorite = async () => {
    const res = await API.get('/categories');
    setKategorite(res.data);
  };

  useEffect(() => {
    fetchProduktet();
    fetchKategorite();
  }, []);

  const produktetFiltruar = produktet.filter(p => {
    const perputhetKerkim = p.emri?.toLowerCase().includes(kerkim.toLowerCase());
    const perputhetStatusi = filtriStatusi === '' || p.statusi === filtriStatusi;
    return perputhetKerkim && perputhetStatusi;
  });

  const getFoto = (foto) => {
    if (!foto) return null;
    if (imazhetLokale[foto]) return imazhetLokale[foto];
    return foto;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await API.put(`/products/${editData.produkt_id}`, form);
        toast.success(`Produkti "${form.emri}" u ndryshua me sukses!`);
      } else {
        await API.post('/products', form);
        toast.success(`Produkti "${form.emri}" u shtua me sukses!`);
      }
      setForm({ emri: '', kategoria_id: '', pershkrimi: '', cmimi: '', statusi: 'aktiv', foto: '' });
      setShowForm(false);
      setEditData(null);
      fetchProduktet();
    } catch (error) {
      toast.error('Ndodhi një gabim!');
    }
  };

  const handleEdit = (produkt) => {
    setEditData(produkt);
    setForm(produkt);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/products/${konfirmo.id}`);
      toast.success(`Produkti "${konfirmo.emri}" u fshi me sukses!`);
      setKonfirmo({ shfaq: false, id: null, emri: '' });
      fetchProduktet();
    } catch (error) {
      toast.error('Ndodhi një gabim gjatë fshirjes!');
    }
  };

  return (
    <div>
      {konfirmo.shfaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-bold mb-2">Konfirmo Fshirjen</h3>
            <p className="text-gray-600 mb-4">A je i sigurt që dëshiron të fshish <strong>"{konfirmo.emri}"</strong>?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Po, Fshij</button>
              <button onClick={() => setKonfirmo({ shfaq: false, id: null, emri: '' })} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Anulo</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produktet</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditData(null); setForm({ emri: '', kategoria_id: '', pershkrimi: '', cmimi: '', statusi: 'aktiv', foto: '' }); }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Shto Produkt
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="🔍 Kërko produkt..." className="border p-2 rounded w-64" value={kerkim} onChange={e => setKerkim(e.target.value)} />
        <select className="border p-2 rounded" value={filtriStatusi} onChange={e => setFiltriStatusi(e.target.value)}>
          <option value="">Të gjitha statuset</option>
          <option value="aktiv">Aktiv</option>
          <option value="joaktiv">Joaktiv</option>
        </select>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-4">{editData ? 'Ndrysho Produkt' : 'Shto Produkt'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Emri</label>
              <input className="border p-2 rounded w-full" placeholder="Emri" value={form.emri} onChange={(e) => setForm({...form, emri: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Cmimi (€)</label>
              <input className="border p-2 rounded w-full" placeholder="0.00" type="number" step="0.01" value={form.cmimi} onChange={(e) => setForm({...form, cmimi: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Kategoria</label>
              <select className="border p-2 rounded w-full" value={form.kategoria_id} onChange={(e) => setForm({...form, kategoria_id: e.target.value})} required>
                <option value="">Zgjidh kategorinë</option>
                {kategorite.map(k => (
                  <option key={k.kategori_id} value={k.kategori_id}>{k.emri}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Statusi</label>
              <select className="border p-2 rounded w-full" value={form.statusi} onChange={(e) => setForm({...form, statusi: e.target.value})}>
                <option value="aktiv">Aktiv</option>
                <option value="joaktiv">Joaktiv</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">Pershkrimi</label>
              <input className="border p-2 rounded w-full" placeholder="Pershkrimi" value={form.pershkrimi} onChange={(e) => setForm({...form, pershkrimi: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">Foto</label>
              <select className="border p-2 rounded w-full" value={form.foto} onChange={(e) => setForm({...form, foto: e.target.value})}>
                <option value="">Pa foto</option>
                <option value="espresso">Espresso</option>
                <option value="icecoffe">Ice Coffe</option>
                <option value="cheesecake">Cheesecake</option>
                <option value="burger">Burger</option>
              </select>
              {form.foto && imazhetLokale[form.foto] && (
                <img src={imazhetLokale[form.foto]} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded border" />
              )}
            </div>
            <div className="col-span-2 flex gap-2">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">{editData ? 'Ruaj Ndryshimet' : 'Shto'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Anulo</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 text-sm">Foto</th>
              <th className="text-left p-2 text-sm">Emri</th>
              <th className="text-left p-2 text-sm">Cmimi</th>
              <th className="text-left p-2 text-sm">Statusi</th>
              <th className="text-left p-2 text-sm">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {produktetFiltruar.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">Nuk u gjet asnjë produkt!</td></tr>
            ) : (
              produktetFiltruar.map((p) => (
                <tr key={p.produkt_id} className="border-t even:bg-gray-50">
                  <td className="p-2">
                    {getFoto(p.foto) ? (
                      <img src={getFoto(p.foto)} alt={p.emri} className="h-10 w-10 object-cover rounded" />
                    ) : (
                      <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">Pa foto</div>
                    )}
                  </td>
                  <td className="p-2 text-sm">{p.emri}</td>
                  <td className="p-2 text-sm">{p.cmimi}€</td>
                  <td className="p-2 text-sm">{p.statusi}</td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(p)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Ndrysho</button>
                      <button onClick={() => setKonfirmo({ shfaq: true, id: p.produkt_id, emri: p.emri })} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Fshij</button>
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

export default Produktet;