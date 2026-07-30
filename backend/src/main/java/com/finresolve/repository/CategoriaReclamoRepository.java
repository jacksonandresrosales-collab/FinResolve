package com.finresolve.repository;
import com.finresolve.model.CategoriaReclamo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CategoriaReclamoRepository extends JpaRepository<CategoriaReclamo, Long> {
    List<CategoriaReclamo> findByEmpresa_EmpresaIdAndEstado_EstadoId(Long empresaId, Long estadoId);
}