package com.trocadeconhecimentos.backend.repository;

import com.trocadeconhecimentos.backend.model.Conexao;
import com.trocadeconhecimentos.backend.model.StatusConexao;
import com.trocadeconhecimentos.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConexaoRepository extends JpaRepository<Conexao, Long> {
    List<Conexao> findByUsuarioDestinatarioAndStatus(Usuario usuario, StatusConexao status);
    List<Conexao> findByUsuarioSolicitanteAndStatus(Usuario usuario, StatusConexao status);
    List<Conexao> findByUsuarioSolicitanteOrUsuarioDestinatario(Usuario usuarioSolicitante, Usuario usuarioDestinatario);
    List<Conexao> findByUsuarioDestinatario(Usuario usuario);
    List<Conexao> findByUsuarioSolicitante(Usuario usuario);
}
