package com.trocadeconhecimentos.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "usuario_conhecimentos")
public class UsuarioConhecimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conhecimento_id", nullable = false)
    private Conhecimento conhecimento;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private TipoConhecimento tipo;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private NivelConhecimento nivel;

    public UsuarioConhecimento() {
    }

    public UsuarioConhecimento(Usuario usuario, Conhecimento conhecimento, TipoConhecimento tipo, NivelConhecimento nivel) {
        this.usuario = usuario;
        this.conhecimento = conhecimento;
        this.tipo = tipo;
        this.nivel = nivel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Conhecimento getConhecimento() {
        return conhecimento;
    }

    public void setConhecimento(Conhecimento conhecimento) {
        this.conhecimento = conhecimento;
    }

    public TipoConhecimento getTipo() {
        return tipo;
    }

    public void setTipo(TipoConhecimento tipo) {
        this.tipo = tipo;
    }

    public NivelConhecimento getNivel() {
        return nivel;
    }

    public void setNivel(NivelConhecimento nivel) {
        this.nivel = nivel;
    }
}
