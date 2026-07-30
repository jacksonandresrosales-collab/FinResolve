package com.finresolve.repository;
import com.finresolve.model.EstadoReclamo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface EstadoReclamoRepository extends JpaRepository<EstadoReclamo, Long> {
    List<EstadoReclamo> findByEmpresa_EmpresaIdAndEstado_EstadoId(Long empresaId, Long estadoId);
}