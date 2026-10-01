package com.trocadeconhecimentos.backend.repository;

import com.trocadeconhecimentos.backend.model.TipoConhecimento;
import com.trocadeconhecimentos.backend.model.Usuario;
import com.trocadeconhecimentos.backend.model.UsuarioConhecimento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioConhecimentoRepository extends JpaRepository<UsuarioConhecimento, Long> {
    List<UsuarioConhecimento> findByUsuario(Usuario usuario);
    List<UsuarioConhecimento> findByTipo(TipoConhecimento tipo);
}
