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
import DetajetPorosise from '../pages/DetajetPorosise';

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
    { key: 'home',             emoji: '📊', label: 'Dashboard',         roles: ['admin', 'kamarier'] },
    { key: 'produktet',        emoji: '🍽️', label: 'Produktet',         roles: ['admin'] },
    { key: 'kategorite',       emoji: '📋', label: 'Kategorite',        roles: ['admin'] },
    { key: 'porosite',         emoji: '🛒', label: 'Porositë',          roles: ['admin', 'kamarier'] },
    { key: 'detajet',          emoji: '📄', label: 'Detajet Porosisë',  roles: ['admin'] },
    { key: 'punetoret',        emoji: '👥', label: 'Punetoret',         roles: ['admin'] },
    { key: 'tavolinat',        emoji: '🪑', label: 'Tavolinat',         roles: ['admin', 'kamarier'] },
    { key: 'inventari',        emoji: '📦', label: 'Inventari',         roles: ['admin'] },
    { key: 'furnitori',        emoji: '🚚', label: 'Furnitoret',        roles: ['admin'] },
    { key: 'rezervimet',       emoji: '📅', label: 'Rezervimet',        roles: ['admin', 'kamarier'] },
    { key: 'turnet',           emoji: '🕐', label: 'Turnet',            roles: ['admin'] },
    { key: 'shpenzimet',       emoji: '💰', label: 'Shpenzimet',        roles: ['admin'] },
    { key: 'porositefurnitor', emoji: '📝', label: 'Porositë Furnitor', roles: ['admin'] },
    { key: 'receta',           emoji: '📖', label: 'Receta',            roles: ['admin'] },
    { key: 'pushimet',         emoji: '🏖️', label: 'Pushimet',         roles: ['admin'] },
  ];

  const Home = () => {
    const [stats, setStats] = useState({
      produktet: 0, porosite: 0, punetoret: 0,
      tavolinat: 0, rezervimet: 0, furnitoret: 0
    });

    useEffect(() => {
      const fetchStats = async () => {
        const [prod, por, pun, tav, rez, fur] = await Promise.allSettled([
          API.get('/products'),
          API.get('/orders'),
          API.get('/employees'),
          API.get('/tables'),
          API.get('/rezervimet'),
          API.get('/furnitoret'),
        ]);
        setStats({
          produktet:  prod.status === 'fulfilled' ? prod.value.data.length : 0,
          porosite:   por.status  === 'fulfilled' ? por.value.data.length  : 0,
          punetoret:  pun.status  === 'fulfilled' ? pun.value.data.length  : 0,
          tavolinat:  tav.status  === 'fulfilled' ? tav.value.data.length  : 0,
          rezervimet: rez.status  === 'fulfilled' ? rez.value.data.length  : 0,
          furnitoret: fur.status  === 'fulfilled' ? fur.value.data.length  : 0,
        });
      };
      fetchStats();
    }, []);

    const cards = [
      { label: 'Produktet',  value: stats.produktet,  color: 'blue'   },
      { label: 'Porositë',   value: stats.porosite,   color: 'green'  },
      { label: 'Punetoret',  value: stats.punetoret,  color: 'purple' },
      { label: 'Tavolinat',  value: stats.tavolinat,  color: 'yellow' },
      { label: 'Rezervimet', value: stats.rezervimet, color: 'red'    },
      { label: 'Furnitoret', value: stats.furnitoret, color: 'orange' },
    ];

    const colorMap = {
      blue:   { border: 'border-blue-500',   text: 'text-blue-600'   },
      green:  { border: 'border-green-500',  text: 'text-green-600'  },
      purple: { border: 'border-purple-500', text: 'text-purple-600' },
      yellow: { border: 'border-yellow-500', text: 'text-yellow-600' },
      red:    { border: 'border-red-500',    text: 'text-red-600'    },
      orange: { border: 'border-orange-500', text: 'text-orange-600' },
    };

    return (
      <div>
        <h1 className="text-xl md:text-2xl font-bold mb-6">
          Mirë se vini, {user?.name}! 👋
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card) => (
            <div key={card.label} className={`bg-white p-6 rounded shadow border-l-4 ${colorMap[card.color].border}`}>
              <h2 className="text-gray-500">{card.label}</h2>
              <p className={`text-3xl font-bold ${colorMap[card.color].text}`}>{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':             return <Home />;
      case 'produktet':        return <Produktet />;
      case 'kategorite':       return <Kategorite />;
      case 'porosite':         return <Porosite />;
      case 'detajet':          return <DetajetPorosise />;
      case 'punetoret':        return <Punetoret />;
      case 'tavolinat':        return <Tavolinat />;
      case 'inventari':        return <Inventari />;
      case 'furnitori':        return <Furnitori />;
      case 'rezervimet':       return <Rezervimet />;
      case 'turnet':           return <Turnet />;
      case 'shpenzimet':       return <Shpenzimet />;
      case 'porositefurnitor': return <PorositeFurnitor />;
      case 'receta':           return <RecetaPerberesit />;
      case 'pushimet':         return <Pushimet />;
      default:                 return <Home />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      <div className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 bg-gray-800 text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-4 md:p-6 text-xl font-bold border-b border-gray-700 flex items-center justify-between">
          <span>☕ Kafeneja</span>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <nav className="flex flex-col p-4 gap-1 overflow-y-auto flex-1">
          {navItems
            .filter(item => item.roles.includes(user?.role))
            .map((item) => (
              <button
                key={item.key}
                onClick={() => { setActivePage(item.key); setSidebarOpen(false); }}
                className={`text-left p-3 rounded hover:bg-gray-700 flex items-center gap-3 text-sm md:text-base transition
                  ${activePage === item.key ? 'bg-gray-700 font-medium' : ''}`}>
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
        </nav>

        <div className="p-4">
          <div className="text-xs text-gray-400 mb-2 px-1">{user?.name} — {user?.role}</div>
          <button onClick={handleLogout} className="w-full p-3 bg-red-600 rounded hover:bg-red-700 text-sm md:text-base transition">
            Dil
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="md:hidden bg-gray-800 text-white p-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="text-xl">☰</button>
          <span className="font-bold">☕ Kafeneja</span>
        </div>

        <div className="flex-1 p-4 md:p-8 overflow-auto">
          {renderContent()}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;