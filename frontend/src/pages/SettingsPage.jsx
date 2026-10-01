import Layout from '../components/Layout';

export default function SettingsPage() {
  return (
    <Layout title="Configurações">
      <div className="settings-grid">
        <div className="card">
          <h3>Preferências</h3>
          <label>
            Notificações por e-mail
            <input type="checkbox" defaultChecked />
          </label>
          <label>
            Receber alertas de compatibilidade
            <input type="checkbox" defaultChecked />
          </label>
        </div>

        <div className="card">
          <h3>Segurança</h3>
          <button className="btn btn-secondary">Alterar senha</button>
          <button className="btn btn-secondary">Privacidade</button>
        </div>
      </div>
    </Layout>
  );
}
