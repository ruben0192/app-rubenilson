import { Link, NavLink } from 'react-router-dom';

export default function Layout({ children, title }) {
  const navItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/perfil', label: 'Perfil' },
    { to: '/conhecimentos', label: 'Conhecimentos' },
    { to: '/buscar', label: 'Buscar' },
    { to: '/conexoes', label: 'Conexões' },
    { to: '/ia', label: 'IA' },
    { to: '/configuracoes', label: 'Configurações' }
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <Link to="/" className="brand">Troca de Conhecimentos 50+</Link>
        </div>

        <nav className="main-nav" aria-label="Menu principal">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-actions">
          <Link to="/login" className="btn btn-secondary">Entrar</Link>
          <Link to="/cadastro" className="btn btn-primary">Criar minha conta</Link>
        </div>
      </header>

      <main className="page-content">
        {title && <h1 className="page-title">{title}</h1>}
        {children}
      </main>
    </div>
  );
}
