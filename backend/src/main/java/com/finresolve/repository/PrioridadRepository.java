package com.finresolve.repository;
import com.finresolve.model.Prioridad;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface PrioridadRepository extends JpaRepository<Prioridad, Long> {
    List<Prioridad> findByEmpresa_EmpresaIdAndEstado_EstadoId(Long empresaId, Long estadoId);
}