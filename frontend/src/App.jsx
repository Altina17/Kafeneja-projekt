import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './components/ProtectedRoute';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Produktet = lazy(() => import('./pages/Produktet'));
const Kategorite = lazy(() => import('./pages/Kategorite'));
const Porosite = lazy(() => import('./pages/Porosite'));
const Tavolinat = lazy(() => import('./pages/Tavolinat'));
const Punetoret = lazy(() => import('./pages/Punetoret'));
const Inventari = lazy(() => import('./pages/Inventari'));
const Furnitori = lazy(() => import('./pages/Furnitori'));
const PorositeFurnitor = lazy(() => import('./pages/PorositeFurnitor'));
const Rezervimet = lazy(() => import('./pages/Rezervimet'));
const Turnet = lazy(() => import('./pages/Turnet'));
const Shpenzimet = lazy(() => import('./pages/Shpenzimet'));

function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-xl">Duke u ngarkuar...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute adminOnly={true}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/produktet" element={
          <ProtectedRoute><Produktet /></ProtectedRoute>
        } />
        <Route path="/kategorite" element={
          <ProtectedRoute><Kategorite /></ProtectedRoute>
        } />
        <Route path="/porosite" element={
          <ProtectedRoute><Porosite /></ProtectedRoute>
        } />
        <Route path="/tavolinat" element={
          <ProtectedRoute><Tavolinat /></ProtectedRoute>
        } />
        <Route path="/punetoret" element={
          <ProtectedRoute adminOnly={true}><Punetoret /></ProtectedRoute>
        } />
        <Route path="/turnet" element={
          <ProtectedRoute adminOnly={true}><Turnet /></ProtectedRoute>
        } />
        <Route path="/inventari" element={
          <ProtectedRoute adminOnly={true}><Inventari /></ProtectedRoute>
        } />
        <Route path="/furnitoret" element={
          <ProtectedRoute adminOnly={true}><Furnitori /></ProtectedRoute>
        } />
        <Route path="/porosite-furnitor" element={
          <ProtectedRoute adminOnly={true}><PorositeFurnitor /></ProtectedRoute>
        } />
        <Route path="/shpenzimet" element={
          <ProtectedRoute adminOnly={true}><Shpenzimet /></ProtectedRoute>
        } />
        <Route path="/rezervimet" element={
          <ProtectedRoute><Rezervimet /></ProtectedRoute>
        } />
        <Route path="*" element={<Login />} />
      </Routes>
    </Suspense>
  );
}

export default App;