package com.finresolve.repository;
import com.finresolve.model.ReclamoHistorial;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ReclamoHistorialRepository extends JpaRepository<ReclamoHistorial, Long> {
    List<ReclamoHistorial> findByReclamo_ReclamoIdOrderByFechaEventoDesc(Long reclamoId);
    List<ReclamoHistorial> findByReclamo_ReclamoIdOrderByFechaEventoAsc(Long reclamoId);
}