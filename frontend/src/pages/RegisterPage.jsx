import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    dataNascimento: '',
    cidade: '',
    estado: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    foto: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.senha !== form.confirmarSenha) {
      setError('As senhas não conferem.');
      return;
    }

    const birthDate = new Date(form.dataNascimento);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (Number.isNaN(birthDate.getTime()) || age < 50) {
      setError('O cadastro é exclusivo para pessoas com 50 anos ou mais.');
      return;
    }

    try {
      await api.auth.register({
        nome: form.nome,
        dataNascimento: form.dataNascimento,
        cidade: form.cidade,
        estado: form.estado,
        email: form.email,
        senha: form.senha,
        foto: form.foto || 'https://via.placeholder.com/150'
      });
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Não foi possível cadastrar.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <h1>Cadastro</h1>
        <p>Crie sua conta no Troca de Conhecimentos 50+</p>

        {error && <div className="alert error">{error}</div>}

        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Nome completo
            <input name="nome" value={form.nome} onChange={handleChange} required />
          </label>

          <label>
            Data de nascimento
            <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} required />
          </label>

          <label>
            Cidade
            <input name="cidade" value={form.cidade} onChange={handleChange} required />
          </label>

          <label>
            Estado
            <input name="estado" value={form.estado} onChange={handleChange} required />
          </label>

          <label className="full-width">
            E-mail
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Senha
            <input type="password" name="senha" value={form.senha} onChange={handleChange} required />
          </label>

          <label>
            Confirmar senha
            <input type="password" name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} required />
          </label>

          <label className="full-width">
            Foto de perfil (URL opcional)
            <input name="foto" value={form.foto} onChange={handleChange} placeholder="https://..." />
          </label>

          <button type="submit" className="btn btn-primary full-width">Cadastrar</button>
        </form>

        <p className="auth-switch">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
