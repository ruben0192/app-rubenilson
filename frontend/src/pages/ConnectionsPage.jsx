import Layout from '../components/Layout';

const data = {
  recebidas: [
    { nome: 'João', status: 'PENDENTE' },
    { nome: 'Carlos', status: 'PENDENTE' }
  ],
  enviadas: [
    { nome: 'Ana', status: 'ACEITA' }
  ],
  aceitas: [
    { nome: 'Maria', status: 'CONECTADO' }
  ]
};

export default function ConnectionsPage() {
  return (
    <Layout title="Conexões">
      <div className="connections-columns">
        <div className="card">
          <h3>Solicitações recebidas</h3>
          {data.recebidas.map((item) => (
            <div className="connection-line" key={item.nome}>
              <span>{item.nome}</span>
              <span className="status-badge">{item.status}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>Solicitações enviadas</h3>
          {data.enviadas.map((item) => (
            <div className="connection-line" key={item.nome}>
              <span>{item.nome}</span>
              <span className="status-badge">{item.status}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>Conexões aceitas</h3>
          {data.aceitas.map((item) => (
            <div className="connection-line" key={item.nome}>
              <span>{item.nome}</span>
              <span className="status-badge">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
