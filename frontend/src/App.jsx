import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Produktet from './pages/Produktet';
import Kategorite from './pages/Kategorite';
import Porosite from './pages/Porosite';
import Tavolinat from './pages/Tavolinat';
import Punetoret from './pages/Punetoret';
import Inventari from './pages/Inventari';
import Furnitori from './pages/Furnitori';
import PorositeFurnitor from './pages/PorositeFurnitor';
import Rezervimet from './pages/Rezervimet';
import Turnet from './pages/Turnet';
import Shpenzimet from './pages/Shpenzimet';

function App() {
  return (
    <Routes>

      {/* Publike */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard — vetem admin */}
      <Route path="/dashboard" element={
        <ProtectedRoute adminOnly={true}>
          <Dashboard />
        </ProtectedRoute>
      } />

      {/* Menyja */}
      <Route path="/produktet" element={
        <ProtectedRoute>
          <Produktet />
        </ProtectedRoute>
      } />
      <Route path="/kategorite" element={
        <ProtectedRoute>
          <Kategorite />
        </ProtectedRoute>
      } />

      {/* Porositë */}
      <Route path="/porosite" element={
        <ProtectedRoute>
          <Porosite />
        </ProtectedRoute>
      } />

      {/* Tavolinat */}
      <Route path="/tavolinat" element={
        <ProtectedRoute>
          <Tavolinat />
        </ProtectedRoute>
      } />

      {/* Stafi */}
      <Route path="/punetoret" element={
        <ProtectedRoute adminOnly={true}>
          <Punetoret />
        </ProtectedRoute>
      } />
      <Route path="/turnet" element={
        <ProtectedRoute adminOnly={true}>
          <Turnet />
        </ProtectedRoute>
      } />

      {/* Inventari dhe furnitoret — vetem admin */}
      <Route path="/inventari" element={
        <ProtectedRoute adminOnly={true}>
          <Inventari />
        </ProtectedRoute>
      } />
      <Route path="/furnitoret" element={
        <ProtectedRoute adminOnly={true}>
          <Furnitori />
        </ProtectedRoute>
      } />
      <Route path="/porosite-furnitor" element={
        <ProtectedRoute adminOnly={true}>
          <PorositeFurnitor />
        </ProtectedRoute>
      } />

      {/* Financat — vetem admin */}
      <Route path="/shpenzimet" element={
        <ProtectedRoute adminOnly={true}>
          <Shpenzimet />
        </ProtectedRoute>
      } />

      {/* Rezervimet */}
      <Route path="/rezervimet" element={
        <ProtectedRoute>
          <Rezervimet />
        </ProtectedRoute>
      } />

      {/* 404 — ridrejto tek login */}
      <Route path="*" element={<Login />} />

    </Routes>
  );
}

export default App;
