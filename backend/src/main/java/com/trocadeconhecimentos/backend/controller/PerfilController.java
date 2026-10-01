package com.trocadeconhecimentos.backend.controller;

import com.trocadeconhecimentos.backend.dto.UsuarioRequest;
import com.trocadeconhecimentos.backend.model.Usuario;
import com.trocadeconhecimentos.backend.repository.UsuarioRepository;
import com.trocadeconhecimentos.backend.security.UsuarioPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PerfilController {

    private final UsuarioRepository usuarioRepository;

    public PerfilController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/perfil")
    public ResponseEntity<Usuario> obterPerfil(@AuthenticationPrincipal UsuarioPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(principal.getUsuario());
    }

    @PutMapping("/perfil")
    public ResponseEntity<Usuario> atualizarPerfil(@AuthenticationPrincipal UsuarioPrincipal principal, @RequestBody UsuarioRequest request) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        Usuario usuario = principal.getUsuario();
        usuario.setNome(request.getNome());
        usuario.setCidade(request.getCidade());
        usuario.setEstado(request.getEstado());
        usuario.setSobre(request.getSobre());
        if (request.getFoto() != null) {
            usuario.setFoto(request.getFoto());
        }

        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }
}
