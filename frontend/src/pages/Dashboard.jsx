import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('home');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderContent = () => {
    switch(activePage) {
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
      default: return <Home />;
    }
  };

  const Home = () => (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mirë se vini, {user?.name}! 👋</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Produktet</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Porositë</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Punetoret</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          ☕ Kafeneja
        </div>
        <nav className="flex flex-col p-4 gap-2 overflow-y-auto">
          <button onClick={() => setActivePage('home')} className={`text-left p-3 rounded hover:bg-gray-700 ${activePage === 'home' ? 'bg-gray-700' : ''}`}>📊 Dashboard</button>
          <button onClick={() => setActivePage('produktet')} className={`text-left p-3 rounded hover:bg-gray-700 ${activePage === 'produktet' ? 'bg-gray-700' : ''}`}>🍽️ Produktet</button>
          <button onClick={() => setActivePage('kategorite')} className={`text-left p-3 rounded hover:bg-gray-700 ${activePage === 'kategorite' ? 'bg-gray-700' : ''}`}>📋 Kategorite</button>
          <button onClick={() => setActivePage('porosite')} className={`text-left p-3 rounded hover:bg-gray-700 ${activePage === 'porosite' ? 'bg-gray-700' : ''}`}>🛒 Porositë</button>
          <button onClick={() => setActivePage('punetoret')} className={`text-left p-3 rounded hover:bg-gray-700 ${activePage === 'punetoret' ? 'bg-gray-700' : ''}`}>👥 Punetoret</button>
          <button onClick={() => setActivePage('tavolinat')} className={`text-left p-3 rounded hover:bg-gray-700 ${activePage === 'tavolinat' ? 'bg-gray-700' : ''}`}>🪑 Tavolinat</button>
          <button onClick={() => setActivePage('inventari')} className={`text-left p-3 rounded hover:bg-gray-700 ${activePage === 'inventari' ? 'bg-gray-700' : ''}`}>📦 Inventari</button>
          <button onClick={() => setActivePage('furnitori')} className={`text-left p-3 rounded hover:bg-gray-700 ${activePage === 'furnitori' ? 'bg-gray-700' : ''}`}>🚚 Furnitoret</button>
          <button onClick={() => setActivePage('rezervimet')} className={`text-left p-3 rounded hover:bg-gray-700 ${activePage === 'rezervimet' ? 'bg-gray-700' : ''}`}>📅 Rezervimet</button>
          <button onClick={() => setActivePage('turnet')} className={`text-left p-3 rounded hover:bg-gray-700 ${activePage === 'turnet' ? 'bg-gray-700' : ''}`}>🕐 Turnet</button>
          <button onClick={() => setActivePage('shpenzimet')} className={`text-left p-3 rounded hover:bg-gray-700 ${activePage === 'shpenzimet' ? 'bg-gray-700' : ''}`}>💰 Shpenzimet</button>
          <button onClick={() => setActivePage('porositefurnitor')} className={`text-left p-3 rounded hover:bg-gray-700 ${activePage === 'porositefurnitor' ? 'bg-gray-700' : ''}`}>📝 Porositë Furnitor</button>
        </nav>
        <div className="mt-auto p-4">
          <button onClick={handleLogout} className="w-full p-3 bg-red-600 rounded hover:bg-red-700">Dil</button>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;