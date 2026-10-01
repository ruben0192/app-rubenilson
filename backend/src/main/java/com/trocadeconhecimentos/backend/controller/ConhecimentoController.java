package com.trocadeconhecimentos.backend.controller;

import com.trocadeconhecimentos.backend.dto.ConhecimentoRequest;
import com.trocadeconhecimentos.backend.model.UsuarioConhecimento;
import com.trocadeconhecimentos.backend.service.ConhecimentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ConhecimentoController {

    private final ConhecimentoService conhecimentoService;

    public ConhecimentoController(ConhecimentoService conhecimentoService) {
        this.conhecimentoService = conhecimentoService;
    }

    @GetMapping("/conhecimentos")
    public ResponseEntity<List<UsuarioConhecimento>> listarTodos(@RequestParam(required = false) Long usuarioId) {
        if (usuarioId != null) {
            return ResponseEntity.ok(conhecimentoService.listarPorUsuario(usuarioId));
        }
        return ResponseEntity.ok(List.of());
    }

    @PostMapping("/conhecimentos")
    public ResponseEntity<UsuarioConhecimento> criar(@RequestParam Long usuarioId, @RequestBody ConhecimentoRequest request) {
        return ResponseEntity.ok(conhecimentoService.criar(usuarioId, request));
    }

    @PutMapping("/conhecimentos/{id}")
    public ResponseEntity<UsuarioConhecimento> atualizar(@PathVariable Long id, @RequestBody ConhecimentoRequest request) {
        return ResponseEntity.ok(conhecimentoService.atualizar(id, request));
    }

    @DeleteMapping("/conhecimentos/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        conhecimentoService.remover(id);
        return ResponseEntity.noContent().build();
    }
}
