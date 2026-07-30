package com.finresolve.repository;

import com.finresolve.model.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EstadoRepository extends JpaRepository<Estado, Long> {

    List<Estado> findAllByOrderByEstadoDescripcionAsc();
}