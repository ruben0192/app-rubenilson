package com.trocadeconhecimentos.backend.controller;

import com.trocadeconhecimentos.backend.dto.AuthRequest;
import com.trocadeconhecimentos.backend.dto.AuthResponse;
import com.trocadeconhecimentos.backend.dto.UsuarioRequest;
import com.trocadeconhecimentos.backend.model.Usuario;
import com.trocadeconhecimentos.backend.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/register")
    public ResponseEntity<Usuario> registrar(@Valid @RequestBody UsuarioRequest request) {
        return ResponseEntity.ok(usuarioService.registrar(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(usuarioService.autenticar(request.getEmail(), request.getSenha()));
    }
}
