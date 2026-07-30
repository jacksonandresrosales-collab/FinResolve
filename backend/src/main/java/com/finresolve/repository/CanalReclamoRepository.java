package com.finresolve.repository;
import com.finresolve.model.CanalReclamo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CanalReclamoRepository extends JpaRepository<CanalReclamo, Long> {
    List<CanalReclamo> findByEmpresa_EmpresaIdAndEstado_EstadoId(Long empresaId, Long estadoId);
}