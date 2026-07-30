package com.finresolve.repository;

import com.finresolve.model.Reclamo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReclamoRepository extends JpaRepository<Reclamo, Long> {

    List<Reclamo> findByEstadoReclamo_EstadoReclamoId(Long estadoReclamoId);

    List<Reclamo> findByAnalista_UsuarioId(Long usuarioId);

    List<Reclamo> findByPrioridad_PrioridadId(Long prioridadId);

    List<Reclamo> findByCodigoContainingIgnoreCase(String codigo);

    long countByEstadoReclamo_EstadoReclamoId(Long estadoReclamoId);

    long countByPrioridad_PrioridadId(Long prioridadId);
}
