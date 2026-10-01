package com.trocadeconhecimentos.backend.controller;

import com.trocadeconhecimentos.backend.model.Conhecimento;
import com.trocadeconhecimentos.backend.model.Usuario;
import com.trocadeconhecimentos.backend.repository.ConhecimentoRepository;
import com.trocadeconhecimentos.backend.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BuscaController {

    private final UsuarioRepository usuarioRepository;
    private final ConhecimentoRepository conhecimentoRepository;

    public BuscaController(UsuarioRepository usuarioRepository, ConhecimentoRepository conhecimentoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.conhecimentoRepository = conhecimentoRepository;
    }

    @GetMapping("/busca")
    public ResponseEntity<Map<String, Object>> buscar(@RequestParam(required = false) String query) {
        Map<String, Object> result = new HashMap<>();
        List<Usuario> usuarios = usuarioRepository.findAll();
        List<Conhecimento> conhecimentos = query == null || query.isBlank()
                ? conhecimentoRepository.findAll()
                : conhecimentoRepository.findByNomeContainingIgnoreCase(query);

        result.put("usuarios", usuarios);
        result.put("conhecimentos", conhecimentos);
        return ResponseEntity.ok(result);
    }
}
