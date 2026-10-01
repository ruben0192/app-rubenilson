import { Link } from 'react-router-dom';

const features = [
  'Conexão entre pessoas com 50+ com interesses em comum',
  'Troca de conhecimentos práticos, culturais e digitais',
  'Acessibilidade, clareza e interface simples',
  'Compatibilidade inteligente entre ensino e aprendizagem'
];

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="brand">Troca de Conhecimentos 50+</div>
        <div className="header-actions">
          <Link to="/login" className="btn btn-secondary">Entrar</Link>
          <Link to="/cadastro" className="btn btn-primary">Criar minha conta</Link>
        </div>
      </header>

      <section className="hero card">
        <div className="hero-copy">
          <p className="eyebrow">Compartilhe saberes. Aprenda com quem vive experiências.</p>
          <h1>Compartilhe o que você sabe. Aprenda o que sempre quis saber.</h1>
          <p>
            A plataforma conecta pessoas com 50 anos ou mais em Sergipe para ensinar e aprender em
            um ambiente acolhedor, moderno e seguro.
          </p>

          <div className="hero-actions">
            <Link to="/cadastro" className="btn btn-primary large">Criar minha conta</Link>
            <Link to="/login" className="btn btn-secondary large">Entrar</Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="mini-card">
            <span>+1.200</span>
            <small>pessoas conectadas</small>
          </div>
          <div className="mini-card">
            <span>36%</span>
            <small>mais compatibilidade por IA</small>
          </div>
        </div>
      </section>

      <section className="info-grid">
        <article className="card">
          <h3>Problema</h3>
          <p>Muitas pessoas com mais de 50 anos têm conhecimentos valiosos e também querem aprender novas habilidades.</p>
        </article>

        <article className="card">
          <h3>Solução</h3>
          <p>Conectar ensino e aprendizagem de forma simples, segura e focada na troca de vivências e saberes.</p>
        </article>

        <article className="card">
          <h3>Como funciona</h3>
          <p>Cadastre seus conhecimentos, encontre alguém compatível e envie uma solicitação de conexão.</p>
        </article>
      </section>

      <section className="section-block">
        <h2>Benefícios</h2>
        <div className="features-grid">
          {features.map((item) => (
            <div key={item} className="feature-item card">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>Funcionalidades</h2>
        <div className="features-grid">
          <div className="feature-item card">Cadastro com validação de idade</div>
          <div className="feature-item card">Perfil com apresentação pessoal</div>
          <div className="feature-item card">Conhecimentos com nível e categoria</div>
          <div className="feature-item card">Busca por pessoas e interesses</div>
          <div className="feature-item card">Compatibilidade inteligente</div>
          <div className="feature-item card">Conexões e solicitações</div>
        </div>
      </section>

      <section className="section-block">
        <h2>Inteligência Artificial</h2>
        <p className="lead">
          A IA ajuda a interpretar interesses, classificar categorias e sugerir pessoas com maior compatibilidade.
        </p>
      </section>

      <section className="section-block">
        <h2>Público-alvo</h2>
        <p className="lead">Pessoas com 50 anos ou mais, residentes em Sergipe, que desejam aprender, ensinar e trocar experiências.</p>
      </section>

      <section className="section-block">
        <h2>Equipe</h2>
        <div className="team-grid">
          <div className="card team-card">
            <strong>Marcio Luan Neves Batista</strong>
            <span>Líder</span>
          </div>
          <div className="card team-card">
            <strong>Rubenilson dos Santos Junior</strong>
            <span>Integrante</span>
          </div>
        </div>
      </section>
    </div>
  );
}
