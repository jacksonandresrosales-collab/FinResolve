package com.finresolve.repository;
import com.finresolve.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface RolRepository extends JpaRepository<Rol, Long> {
    List<Rol> findByEmpresa_EmpresaId(Long empresaId);
}