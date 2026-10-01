import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const result = await api.auth.login(form);
      localStorage.setItem('token', result.token || 'demo-token');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Não foi possível entrar.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <h1>Entrar</h1>
        <p>Bem-vindo de volta ao Troca de Conhecimentos 50+</p>

        {error && <div className="alert error">{error}</div>}

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="full-width">
            E-mail
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label className="full-width">
            Senha
            <input type="password" name="senha" value={form.senha} onChange={handleChange} required />
          </label>

          <button type="submit" className="btn btn-primary full-width">Entrar</button>
        </form>

        <p className="auth-switch">
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}
