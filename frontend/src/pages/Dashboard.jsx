import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          ☕ Kafeneja
        </div>
        <nav className="flex flex-col p-4 gap-2">
          <button className="text-left p-3 rounded hover:bg-gray-700">📊 Dashboard</button>
          <button className="text-left p-3 rounded hover:bg-gray-700">🍽️ Produktet</button>
          <button className="text-left p-3 rounded hover:bg-gray-700">📋 Kategorite</button>
          <button className="text-left p-3 rounded hover:bg-gray-700">🛒 Porositë</button>
          <button className="text-left p-3 rounded hover:bg-gray-700">👥 Punetoret</button>
          <button className="text-left p-3 rounded hover:bg-gray-700">🪑 Tavolinat</button>
        </nav>
        <div className="mt-auto p-4">
          <button 
            onClick={handleLogout}
            className="w-full p-3 bg-red-600 rounded hover:bg-red-700"
          >
            Dil
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Mirë se vini, {user?.name}! 👋</h1>
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

    </div>
  );
};

export default Dashboard;