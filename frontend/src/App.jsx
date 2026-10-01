import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import KnowledgePage from './pages/KnowledgePage';
import SearchPage from './pages/SearchPage';
import ConnectionsPage from './pages/ConnectionsPage';
import AIPage from './pages/AIPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/perfil" element={<ProfilePage />} />
      <Route path="/conhecimentos" element={<KnowledgePage />} />
      <Route path="/buscar" element={<SearchPage />} />
      <Route path="/conexoes" element={<ConnectionsPage />} />
      <Route path="/ia" element={<AIPage />} />
      <Route path="/configuracoes" element={<SettingsPage />} />
    </Routes>
  );
}
