import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Produktet from '../pages/Produktet';
import Kategorite from '../pages/Kategorite';
import Porosite from '../pages/Porosite';
import Inventari from '../pages/Inventari';
import Furnitori from '../pages/Furnitori';
import Rezervimet from '../pages/Rezervimet';
import Turnet from '../pages/Turnet';
import Shpenzimet from '../pages/Shpenzimet';
import PorositeFurnitor from '../pages/PorositeFurnitor';
import Punetoret from '../pages/Punetoret';
import Tavolinat from '../pages/Tavolinat';
import RecetaPerberesit from '../pages/RecetaPerberesit';
import Pushimet from '../pages/Pushimet';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { key: 'home', emoji: '📊', label: 'Dashboard' },
    { key: 'produktet', emoji: '🍽️', label: 'Produktet' },
    { key: 'kategorite', emoji: '📋', label: 'Kategorite' },
    { key: 'porosite', emoji: '🛒', label: 'Porositë' },
    { key: 'punetoret', emoji: '👥', label: 'Punetoret' },
    { key: 'tavolinat', emoji: '🪑', label: 'Tavolinat' },
    { key: 'inventari', emoji: '📦', label: 'Inventari' },
    { key: 'furnitori', emoji: '🚚', label: 'Furnitoret' },
    { key: 'rezervimet', emoji: '📅', label: 'Rezervimet' },
    { key: 'turnet', emoji: '🕐', label: 'Turnet' },
    { key: 'shpenzimet', emoji: '💰', label: 'Shpenzimet' },
    { key: 'porositefurnitor', emoji: '📝', label: 'Porositë Furnitor' },
    { key: 'receta', emoji: '📖', label: 'Receta' },
    { key: 'pushimet', emoji: '🏖️', label: 'Pushimet' },
  ];

  const Home = () => {
    const [stats, setStats] = useState({ produktet: 0, porosite: 0, punetoret: 0, tavolinat: 0, rezervimet: 0, furnitoret: 0 });

    useEffect(() => {
      const fetchStats = async () => {
        try {
          const [prod, por, pun, tav, rez, fur] = await Promise.all([
            API.get('/products'),
            API.get('/orders'),
            API.get('/employees'),
            API.get('/tables'),
            API.get('/rezervimet'),
            API.get('/furnitoret'),
          ]);
          setStats({
            produktet: prod.data.length,
            porosite: por.data.length,
            punetoret: pun.data.length,
            tavolinat: tav.data.length,
            rezervimet: rez.data.length,
            furnitoret: fur.data.length,
          });
        } catch (err) {
          console.error(err);
        }
      };
      fetchStats();
    }, []);

    return (
      <div>
        <h1 className="text-xl md:text-2xl font-bold mb-6">Mirë se vini, {user?.name}! 👋</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
            <h2 className="text-gray-500">Produktet</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.produktet}</p>
          </div>
          <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
            <h2 className="text-gray-500">Porositë</h2>
            <p className="text-3xl font-bold text-green-600">{stats.porosite}</p>
          </div>
          <div className="bg-white p-6 rounded shadow border-l-4 border-purple-500">
            <h2 className="text-gray-500">Punetoret</h2>
            <p className="text-3xl font-bold text-purple-600">{stats.punetoret}</p>
          </div>
          <div className="bg-white p-6 rounded shadow border-l-4 border-yellow-500">
            <h2 className="text-gray-500">Tavolinat</h2>
            <p className="text-3xl font-bold text-yellow-600">{stats.tavolinat}</p>
          </div>
          <div className="bg-white p-6 rounded shadow border-l-4 border-red-500">
            <h2 className="text-gray-500">Rezervimet</h2>
            <p className="text-3xl font-bold text-red-600">{stats.rezervimet}</p>
          </div>
          <div className="bg-white p-6 rounded shadow border-l-4 border-orange-500">
            <h2 className="text-gray-500">Furnitoret</h2>
            <p className="text-3xl font-bold text-orange-600">{stats.furnitoret}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home': return <Home />;
      case 'produktet': return <Produktet />;
      case 'kategorite': return <Kategorite />;
      case 'porosite': return <Porosite />;
      case 'punetoret': return <Punetoret />;
      case 'tavolinat': return <Tavolinat />;
      case 'inventari': return <Inventari />;
      case 'furnitori': return <Furnitori />;
      case 'rezervimet': return <Rezervimet />;
      case 'turnet': return <Turnet />;
      case 'shpenzimet': return <Shpenzimet />;
      case 'porositefurnitor': return <PorositeFurnitor />;
      case 'receta': return <RecetaPerberesit />;
      case 'pushimet': return <Pushimet />;
      default: return <Home />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Overlay per mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 bg-gray-800 text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-4 md:p-6 text-xl font-bold border-b border-gray-700 flex items-center justify-between">
          <span>☕ Kafeneja</span>
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-1 overflow-y-auto flex-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActivePage(item.key); setSidebarOpen(false); }}
              className={`text-left p-3 rounded hover:bg-gray-700 flex items-center gap-3 text-sm md:text-base ${activePage === item.key ? 'bg-gray-700' : ''}`}
            >
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4">
          <button onClick={handleLogout} className="w-full p-3 bg-red-600 rounded hover:bg-red-700 text-sm md:text-base">
            Dil
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar per mobile */}
        <div className="md:hidden bg-gray-800 text-white p-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-xl"
          >
            ☰
          </button>
          <span className="font-bold">☕ Kafeneja</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-8 overflow-auto">
          {renderContent()}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
