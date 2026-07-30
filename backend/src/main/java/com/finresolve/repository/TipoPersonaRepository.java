package com.finresolve.repository;

import com.finresolve.model.TipoPersona;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TipoPersonaRepository extends JpaRepository<TipoPersona, Long> {

    List<TipoPersona> findByEmpresa_EmpresaIdAndEstado_EstadoId(Long empresaId, Long estadoId);
}
