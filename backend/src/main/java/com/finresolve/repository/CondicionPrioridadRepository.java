package com.finresolve.repository;
import com.finresolve.model.CondicionPrioridad;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CondicionPrioridadRepository extends JpaRepository<CondicionPrioridad, Long> {
    List<CondicionPrioridad> findByEmpresa_EmpresaIdAndEstado_EstadoId(Long empresaId, Long estadoId);
}