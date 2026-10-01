package com.trocadeconhecimentos.backend.service;

import com.trocadeconhecimentos.backend.dto.AuthResponse;
import com.trocadeconhecimentos.backend.dto.UsuarioRequest;
import com.trocadeconhecimentos.backend.model.Usuario;
import com.trocadeconhecimentos.backend.repository.UsuarioRepository;
import com.trocadeconhecimentos.backend.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public UsuarioService(UsuarioRepository usuarioRepository,
                         PasswordEncoder passwordEncoder,
                         AuthenticationManager authenticationManager,
                         JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public Usuario registrar(UsuarioRequest request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado");
        }

        LocalDate hoje = LocalDate.now();
        int idade = hoje.getYear() - request.getDataNascimento().getYear();
        if (request.getDataNascimento().isAfter(hoje.minusYears(50))) {
            throw new IllegalArgumentException("Cadastro permitido somente para pessoas com 50 anos ou mais.");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setDataNascimento(request.getDataNascimento());
        usuario.setCidade(request.getCidade());
        usuario.setEstado(request.getEstado());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        usuario.setFoto(request.getFoto());
        usuario.setSobre(request.getSobre());

        return usuarioRepository.save(usuario);
    }

    public AuthResponse autenticar(String email, String senha) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, senha)
        );

        if (!authentication.isAuthenticated()) {
            throw new IllegalArgumentException("Credenciais inválidas");
        }

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        String token = jwtService.generateToken(usuario.getEmail());
        return new AuthResponse(token, usuario.getNome(), usuario.getEmail(), usuario.getId());
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario atualizar(Long id, UsuarioRequest request) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        usuario.setNome(request.getNome());
        usuario.setCidade(request.getCidade());
        usuario.setEstado(request.getEstado());
        usuario.setSobre(request.getSobre());
        if (request.getFoto() != null) {
            usuario.setFoto(request.getFoto());
        }
        if (request.getSenha() != null && !request.getSenha().isBlank()) {
            usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        }

        return usuarioRepository.save(usuario);
    }
}
