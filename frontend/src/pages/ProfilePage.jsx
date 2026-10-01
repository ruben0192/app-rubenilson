import Layout from '../components/Layout';

const profile = {
  nome: 'Maria da Silva',
  cidade: 'Aracaju',
  estado: 'SE',
  idade: '68 anos',
  sobre: 'Gosto de compartilhar receitas, histórias e ensinamentos da vida cotidiana.',
  ensina: ['Culinária', 'Cultura popular', 'Artesanato'],
  aprende: ['Informática', 'Celular', 'Fotografia']
};

export default function ProfilePage() {
  return (
    <Layout title="Meu Perfil">
      <div className="profile-panel card">
        <div className="profile-header">
          <div className="avatar large">M</div>
          <div>
            <h2>{profile.nome}</h2>
            <p>{profile.cidade} - {profile.estado}</p>
            <p>{profile.idade}</p>
          </div>
        </div>

        <div className="profile-info">
          <div>
            <h3>Sobre mim</h3>
            <p>{profile.sobre}</p>
          </div>

          <div className="profile-columns">
            <div>
              <h3>Ensino</h3>
              <ul>
                {profile.ensina.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div>
              <h3>Quero aprender</h3>
              <ul>
                {profile.aprende.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <button className="btn btn-primary">Editar perfil</button>
      </div>
    </Layout>
  );
}
