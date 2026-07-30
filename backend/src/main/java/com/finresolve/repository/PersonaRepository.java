package com.finresolve.repository;
import com.finresolve.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface PersonaRepository extends JpaRepository<Persona, Long> {
    Optional<Persona> findByIdentificacion(String identificacion);
    List<Persona> findByEmpresa_EmpresaId(Long empresaId);
}