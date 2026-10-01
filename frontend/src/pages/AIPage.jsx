import { useState } from 'react';
import Layout from '../components/Layout';

export default function AIPage() {
  const [input, setInput] = useState('Quero aprender a mexer melhor no computador e no celular.');
  const [result, setResult] = useState({
    categoria: 'Tecnologia',
    interesses: ['Computador', 'Celular'],
    nivel: 'Iniciante',
    tipo: 'DESEJA_APRENDER'
  });

  const handleInterpret = () => {
    const lowered = input.toLowerCase();
    const categoria = lowered.includes('cozinhar') || lowered.includes('culinária') ? 'Culinária' : 'Tecnologia';
    const interesses = lowered.includes('computador') || lowered.includes('celular') ? ['Computador', 'Celular'] : ['Conhecimento prático'];
    const nivel = lowered.includes('iniciante') || lowered.includes('mexer melhor') ? 'Iniciante' : 'Intermediário';

    setResult({
      categoria,
      interesses,
      nivel,
      tipo: lowered.includes('ensinar') ? 'ENSINA' : 'DESEJA_APRENDER'
    });
  };

  return (
    <Layout title="Assistente de IA">
      <div className="card ai-panel">
        <label>
          Descreva o que você deseja aprender ou ensinar
          <textarea value={input} onChange={(event) => setInput(event.target.value)} rows={5} />
        </label>

        <button className="btn btn-primary" onClick={handleInterpret}>Interpretar com IA</button>
      </div>

      <div className="card ai-result">
        <h3>Resultado da análise</h3>
        <p><strong>Categoria:</strong> {result.categoria}</p>
        <p><strong>Interesses:</strong> {result.interesses.join(', ')}</p>
        <p><strong>Nível:</strong> {result.nivel}</p>
        <p><strong>Tipo:</strong> {result.tipo}</p>
      </div>
    </Layout>
  );
}
