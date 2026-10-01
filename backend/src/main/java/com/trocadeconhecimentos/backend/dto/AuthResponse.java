package com.trocadeconhecimentos.backend.dto;

public class AuthResponse {
    private String token;
    private String nome;
    private String email;
    private Long usuarioId;

    public AuthResponse(String token, String nome, String email, Long usuarioId) {
        this.token = token;
        this.nome = nome;
        this.email = email;
        this.usuarioId = usuarioId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
}
