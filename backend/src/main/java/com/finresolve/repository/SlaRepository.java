package com.finresolve.repository;
import com.finresolve.model.Sla;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface SlaRepository extends JpaRepository<Sla, Long> {
    Optional<Sla> findByPrioridad_PrioridadId(Long prioridadId);
}