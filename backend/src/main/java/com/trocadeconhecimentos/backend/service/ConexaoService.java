package com.trocadeconhecimentos.backend.service;

import com.trocadeconhecimentos.backend.model.Conexao;
import com.trocadeconhecimentos.backend.model.StatusConexao;
import com.trocadeconhecimentos.backend.model.Usuario;
import com.trocadeconhecimentos.backend.repository.ConexaoRepository;
import com.trocadeconhecimentos.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConexaoService {

    private final ConexaoRepository conexaoRepository;
    private final UsuarioRepository usuarioRepository;

    public ConexaoService(ConexaoRepository conexaoRepository, UsuarioRepository usuarioRepository) {
        this.conexaoRepository = conexaoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Conexao enviarSolicitacao(Long usuarioSolicitanteId, Long usuarioDestinatarioId) {
        Usuario solicitante = usuarioRepository.findById(usuarioSolicitanteId)
                .orElseThrow(() -> new IllegalArgumentException("Solicitante não encontrado."));
        Usuario destinatario = usuarioRepository.findById(usuarioDestinatarioId)
                .orElseThrow(() -> new IllegalArgumentException("Destinatário não encontrado."));

        if (solicitante.getId().equals(destinatario.getId())) {
            throw new IllegalArgumentException("Você não pode se conectar consigo mesmo.");
        }

        Conexao conexao = new Conexao(solicitante, destinatario);
        return conexaoRepository.save(conexao);
    }

    public List<Conexao> listarParaUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        return conexaoRepository.findByUsuarioDestinatario(usuario);
    }

    public List<Conexao> listarEnviadas(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        return conexaoRepository.findByUsuarioSolicitante(usuario);
    }

    public Conexao aceitar(Long conexaoId) {
        Conexao conexao = conexaoRepository.findById(conexaoId)
                .orElseThrow(() -> new IllegalArgumentException("Conexão não encontrada."));
        conexao.setStatus(StatusConexao.ACEITA);
        return conexaoRepository.save(conexao);
    }

    public Conexao recusar(Long conexaoId) {
        Conexao conexao = conexaoRepository.findById(conexaoId)
                .orElseThrow(() -> new IllegalArgumentException("Conexão não encontrada."));
        conexao.setStatus(StatusConexao.RECUSADA);
        return conexaoRepository.save(conexao);
    }

    public void cancelar(Long conexaoId) {
        Conexao conexao = conexaoRepository.findById(conexaoId)
                .orElseThrow(() -> new IllegalArgumentException("Conexão não encontrada."));
        conexao.setStatus(StatusConexao.CANCELADA);
        conexaoRepository.save(conexao);
    }
}
