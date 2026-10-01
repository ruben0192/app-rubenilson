package com.trocadeconhecimentos.backend.service;

import com.trocadeconhecimentos.backend.dto.ConhecimentoRequest;
import com.trocadeconhecimentos.backend.model.Conhecimento;
import com.trocadeconhecimentos.backend.model.NivelConhecimento;
import com.trocadeconhecimentos.backend.model.TipoConhecimento;
import com.trocadeconhecimentos.backend.model.Usuario;
import com.trocadeconhecimentos.backend.model.UsuarioConhecimento;
import com.trocadeconhecimentos.backend.repository.ConhecimentoRepository;
import com.trocadeconhecimentos.backend.repository.UsuarioConhecimentoRepository;
import com.trocadeconhecimentos.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConhecimentoService {

    private final ConhecimentoRepository conhecimentoRepository;
    private final UsuarioRepository usuarioRepository;
    private final UsuarioConhecimentoRepository usuarioConhecimentoRepository;

    public ConhecimentoService(ConhecimentoRepository conhecimentoRepository,
                              UsuarioRepository usuarioRepository,
                              UsuarioConhecimentoRepository usuarioConhecimentoRepository) {
        this.conhecimentoRepository = conhecimentoRepository;
        this.usuarioRepository = usuarioRepository;
        this.usuarioConhecimentoRepository = usuarioConhecimentoRepository;
    }

    public List<UsuarioConhecimento> listarPorUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        return usuarioConhecimentoRepository.findByUsuario(usuario);
    }

    public UsuarioConhecimento criar(Long usuarioId, ConhecimentoRequest request) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        Conhecimento conhecimento = new Conhecimento();
        conhecimento.setNome(request.getNome());
        conhecimento.setCategoria(request.getCategoria());
        conhecimento.setDescricao(request.getDescricao());

        Conhecimento salvo = conhecimentoRepository.save(conhecimento);
        UsuarioConhecimento usuarioConhecimento = new UsuarioConhecimento(usuario, salvo, request.getTipo(), request.getNivel());
        return usuarioConhecimentoRepository.save(usuarioConhecimento);
    }

    public UsuarioConhecimento atualizar(Long id, ConhecimentoRequest request) {
        UsuarioConhecimento usuarioConhecimento = usuarioConhecimentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Conhecimento não encontrado."));

        usuarioConhecimento.getConhecimento().setNome(request.getNome());
        usuarioConhecimento.getConhecimento().setCategoria(request.getCategoria());
        usuarioConhecimento.getConhecimento().setDescricao(request.getDescricao());
        usuarioConhecimento.setTipo(request.getTipo());
        usuarioConhecimento.setNivel(request.getNivel());

        conhecimentoRepository.save(usuarioConhecimento.getConhecimento());
        return usuarioConhecimentoRepository.save(usuarioConhecimento);
    }

    public void remover(Long id) {
        UsuarioConhecimento usuarioConhecimento = usuarioConhecimentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Conhecimento não encontrado."));
        usuarioConhecimentoRepository.delete(usuarioConhecimento);
    }

    public List<Conhecimento> buscar(String query) {
        if (query == null || query.isBlank()) {
            return conhecimentoRepository.findAll();
        }
        return conhecimentoRepository.findByNomeContainingIgnoreCase(query);
    }
}
