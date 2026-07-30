package com.finresolve.repository;

import com.finresolve.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    List<Empresa> findByEstado_EstadoId(Long estadoId);
}