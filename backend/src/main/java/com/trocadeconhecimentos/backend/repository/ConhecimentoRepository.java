package com.trocadeconhecimentos.backend.repository;

import com.trocadeconhecimentos.backend.model.Conhecimento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConhecimentoRepository extends JpaRepository<Conhecimento, Long> {
    List<Conhecimento> findByNomeContainingIgnoreCase(String nome);
    List<Conhecimento> findByCategoriaContainingIgnoreCase(String categoria);
}
