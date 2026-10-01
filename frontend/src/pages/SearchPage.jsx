import Layout from '../components/Layout';

const results = [
  { nome: 'Ana', cidade: 'Itabaiana', conhecimento: 'Artesanato', categoria: 'Artes e Cultura', nivel: 'Avançado' },
  { nome: 'Pedro', cidade: 'São Cristóvão', conhecimento: 'Informática', categoria: 'Tecnologia', nivel: 'Intermediário' },
  { nome: 'Lúcia', cidade: 'Simão Dias', conhecimento: 'Jardinagem', categoria: 'Natureza', nivel: 'Avançado' }
];

export default function SearchPage() {
  return (
    <Layout title="Buscar Pessoas e Conhecimentos">
      <div className="search-box card">
        <input type="text" placeholder="Pesquisar por pessoas, conhecimentos, categoria ou cidade" />
        <button className="btn btn-primary">Buscar</button>
      </div>

      <div className="cards-list">
        {results.map((item) => (
          <article key={item.nome} className="card search-card">
            <h3>{item.nome}</h3>
            <p>{item.cidade}</p>
            <p><strong>Conhecimento:</strong> {item.conhecimento}</p>
            <p><strong>Categoria:</strong> {item.categoria}</p>
            <p><strong>Nível:</strong> {item.nivel}</p>
          </article>
        ))}
      </div>
    </Layout>
  );
}
