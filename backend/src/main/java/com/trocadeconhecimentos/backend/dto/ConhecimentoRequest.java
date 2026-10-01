package com.trocadeconhecimentos.backend.dto;

import com.trocadeconhecimentos.backend.model.NivelConhecimento;
import com.trocadeconhecimentos.backend.model.TipoConhecimento;

public class ConhecimentoRequest {
    private String nome;
    private String categoria;
    private String descricao;
    private TipoConhecimento tipo;
    private NivelConhecimento nivel;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
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
