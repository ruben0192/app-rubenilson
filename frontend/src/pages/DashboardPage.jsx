import Layout from '../components/Layout';

const stats = [
  { label: 'Conhecimentos que ensino', value: '6' },
  { label: 'Conhecimentos que quero aprender', value: '4' },
  { label: 'Compatibilidades encontradas', value: '12' },
  { label: 'Solicitações recebidas', value: '3' },
  { label: 'Solicitações enviadas', value: '2' }
];

const connections = [
  {
    nome: 'Maria',
    cidade: 'Aracaju',
    ensina: 'Culinária',
    deseja: 'Informática',
    compatibilidade: '92%'
  },
  {
    nome: 'João',
    cidade: 'Nossa Senhora do Socorro',
    ensina: 'Informática',
    deseja: 'Fotografia',
    compatibilidade: '88%'
  },
  {
    nome: 'Carlos',
    cidade: 'Lagarto',
    ensina: 'Jardinagem',
    deseja: 'Celular',
    compatibilidade: '79%'
  }
];

export default function DashboardPage() {
  return (
    <Layout title="Dashboard">
      <div className="dashboard-welcome">
        <h2>Olá, Maria!</h2>
      </div>

      <div className="stats-grid">
        {stats.map((item) => (
          <div key={item.label} className="stat-card card">
            <span>{item.value}</span>
            <small>{item.label}</small>
          </div>
        ))}
      </div>

      <section className="section-block">
        <h3>Possíveis conexões para você</h3>
        <div className="connection-grid">
          {connections.map((person) => (
            <article key={person.nome} className="card connection-card">
              <div className="avatar">{person.nome.charAt(0)}</div>
              <h4>{person.nome}</h4>
              <p>{person.cidade}</p>
              <ul>
                <li>Ensina: {person.ensina}</li>
                <li>Deseja aprender: {person.deseja}</li>
                <li>Compatibilidade: {person.compatibilidade}</li>
              </ul>
              <div className="inline-actions">
                <button className="btn btn-secondary">Ver perfil</button>
                <button className="btn btn-primary">Conectar</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
