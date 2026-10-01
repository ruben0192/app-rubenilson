import { useState } from 'react';
import Layout from '../components/Layout';

const initialItems = [
  { nome: 'Culinária nordestina', categoria: 'Culinária', descricao: 'Receitas e técnicas de cozinha', nivel: 'Intermediário', tipo: 'ENSINA' },
  { nome: 'Informática básica', categoria: 'Tecnologia', descricao: 'Uso de e-mail e internet', nivel: 'Iniciante', tipo: 'DESEJA_APRENDER' }
];

export default function KnowledgePage() {
  const [items, setItems] = useState(initialItems);

  const addItem = () => {
    setItems([
      ...items,
      { nome: 'Novo conhecimento', categoria: 'Tecnologia', descricao: 'Descreva o que você deseja ensinar ou aprender', nivel: 'Iniciante', tipo: 'ENSINA' }
    ]);
  };

  return (
    <Layout title="Meus Conhecimentos">
      <div className="toolbar">
        <button className="btn btn-primary" onClick={addItem}>Adicionar conhecimento</button>
      </div>

      <div className="cards-list">
        {items.map((item, index) => (
          <div key={`${item.nome}-${index}`} className="card knowledge-card">
            <div className="tag">{item.tipo}</div>
            <h3>{item.nome}</h3>
            <p><strong>Categoria:</strong> {item.categoria}</p>
            <p>{item.descricao}</p>
            <p><strong>Nível:</strong> {item.nivel}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
