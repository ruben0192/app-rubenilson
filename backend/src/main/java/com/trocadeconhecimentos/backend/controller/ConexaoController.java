package com.trocadeconhecimentos.backend.controller;

import com.trocadeconhecimentos.backend.dto.ConexaoRequest;
import com.trocadeconhecimentos.backend.model.Conexao;
import com.trocadeconhecimentos.backend.service.ConexaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ConexaoController {

    private final ConexaoService conexaoService;

    public ConexaoController(ConexaoService conexaoService) {
        this.conexaoService = conexaoService;
    }

    @GetMapping("/conexoes")
    public ResponseEntity<List<Conexao>> listar(@RequestParam Long usuarioId) {
        List<Conexao> recebidas = conexaoService.listarParaUsuario(usuarioId);
        List<Conexao> enviadas = conexaoService.listarEnviadas(usuarioId);
        recebidas.addAll(enviadas);
        return ResponseEntity.ok(recebidas);
    }

    @PostMapping("/conexoes")
    public ResponseEntity<Conexao> enviarSolicitacao(@RequestParam Long solicitanteId, @RequestBody ConexaoRequest request) {
        return ResponseEntity.ok(conexaoService.enviarSolicitacao(solicitanteId, request.getUsuarioDestinatarioId()));
    }

    @PutMapping("/conexoes/{id}/aceitar")
    public ResponseEntity<Conexao> aceitar(@PathVariable Long id) {
        return ResponseEntity.ok(conexaoService.aceitar(id));
    }

    @PutMapping("/conexoes/{id}/recusar")
    public ResponseEntity<Conexao> recusar(@PathVariable Long id) {
        return ResponseEntity.ok(conexaoService.recusar(id));
    }
}
