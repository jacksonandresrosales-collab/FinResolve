package com.finresolve.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.finresolve.dto.CatalogoResponse;
import com.finresolve.dto.ClienteResponse;
import com.finresolve.model.CanalReclamo;
import com.finresolve.model.CategoriaReclamo;
import com.finresolve.model.CondicionPrioridad;
import com.finresolve.model.EstadoReclamo;
import com.finresolve.model.Persona;
import com.finresolve.model.Prioridad;
import com.finresolve.model.Rol;
import com.finresolve.model.TipoPersona;
import com.finresolve.model.Usuario;
import com.finresolve.repository.CanalReclamoRepository;
import com.finresolve.repository.CategoriaReclamoRepository;
import com.finresolve.repository.CondicionPrioridadRepository;
import com.finresolve.repository.EstadoReclamoRepository;
import com.finresolve.repository.PrioridadRepository;
import com.finresolve.repository.RolRepository;
import com.finresolve.repository.TipoPersonaRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Service
@Transactional(readOnly = true)
public class CatalogoService {

    private final CanalReclamoRepository canalReclamoRepository;
    private final CategoriaReclamoRepository categoriaReclamoRepository;
    private final PrioridadRepository prioridadRepository;
    private final EstadoReclamoRepository estadoReclamoRepository;
    private final CondicionPrioridadRepository condicionPrioridadRepository;
    private final RolRepository rolRepository;
    private final TipoPersonaRepository tipoPersonaRepository;
    private final EntityManager entityManager;

    @Autowired
    public CatalogoService(CanalReclamoRepository canalReclamoRepository,
                           CategoriaReclamoRepository categoriaReclamoRepository,
                           PrioridadRepository prioridadRepository,
                           EstadoReclamoRepository estadoReclamoRepository,
                           CondicionPrioridadRepository condicionPrioridadRepository,
                           RolRepository rolRepository,
                           TipoPersonaRepository tipoPersonaRepository,
                           EntityManager entityManager) {
        this.canalReclamoRepository = canalReclamoRepository;
        this.categoriaReclamoRepository = categoriaReclamoRepository;
        this.prioridadRepository = prioridadRepository;
        this.estadoReclamoRepository = estadoReclamoRepository;
        this.condicionPrioridadRepository = condicionPrioridadRepository;
        this.rolRepository = rolRepository;
        this.tipoPersonaRepository = tipoPersonaRepository;
        this.entityManager = entityManager;
    }

    public List<CatalogoResponse> listarCanales() {
        return canalReclamoRepository.findAll().stream()
                .map(c -> new CatalogoResponse(c.getCanalReclamoId(), c.getCanalDescripcion()))
                .collect(Collectors.toList());
    }

    public List<CatalogoResponse> listarCategorias() {
        return categoriaReclamoRepository.findAll().stream()
                .map(c -> new CatalogoResponse(c.getCategoriaReclamoId(), c.getCategoriaDescripcion()))
                .collect(Collectors.toList());
    }

    public List<CatalogoResponse> listarPrioridades() {
        return prioridadRepository.findAll().stream()
                .map(p -> new CatalogoResponse(p.getPrioridadId(), p.getPrioridadDescripcion()))
                .collect(Collectors.toList());
    }

    public List<CatalogoResponse> listarEstadosReclamo() {
        return estadoReclamoRepository.findAll().stream()
                .map(e -> new CatalogoResponse(e.getEstadoReclamoId(), e.getEstadoReclamoDescripcion()))
                .collect(Collectors.toList());
    }

    public List<CatalogoResponse> listarAnalistas() {
        TypedQuery<Usuario> query = entityManager.createQuery(
                "SELECT u FROM Usuario u JOIN UsuarioRol ur ON u = ur.usuario WHERE ur.rol.rolId = :rolId",
                Usuario.class);
        query.setParameter("rolId", 3L);
        return query.getResultStream()
                .map(u -> {
                    Persona p = u.getPersona();
                    String nombre = p.getNombre1() + " " + p.getApellido1();
                    return new CatalogoResponse(u.getUsuarioId(), nombre);
                })
                .collect(Collectors.toList());
    }

    public List<ClienteResponse> listarClientes() {
        TypedQuery<Persona> query = entityManager.createQuery(
                "SELECT p FROM Persona p JOIN PersonaTipoPersona ptp ON p = ptp.persona WHERE ptp.tipoPersona.tipoPersonaId = :tipoPersonaId",
                Persona.class);
        query.setParameter("tipoPersonaId", 1L);
        return query.getResultStream()
                .map(p -> {
                    String nombreCompleto = p.getNombre1() + " " + p.getApellido1();
                    if (p.getNombre2() != null && !p.getNombre2().isEmpty()) {
                        nombreCompleto = p.getNombre1() + " " + p.getNombre2() + " " + p.getApellido1();
                    }
                    return new ClienteResponse(p.getPersonaId(), nombreCompleto,
                            p.getIdentificacion(), p.getTelefono(), p.getCorreoElectronico());
                })
                .collect(Collectors.toList());
    }

    public List<CatalogoResponse> listarCondiciones() {
        return condicionPrioridadRepository.findAll().stream()
                .map(c -> new CatalogoResponse(c.getCondicionPrioridadId(), c.getCondicionDescripcion()))
                .collect(Collectors.toList());
    }

    public List<CatalogoResponse> listarTipoPersona() {
        return tipoPersonaRepository.findAll().stream()
                .map(t -> new CatalogoResponse(t.getTipoPersonaId(), t.getTipoPersonaDescripcion()))
                .collect(Collectors.toList());
    }

    public List<CatalogoResponse> listarRoles() {
        return rolRepository.findAll().stream()
                .map(r -> new CatalogoResponse(r.getRolId(), r.getRolDescripcion()))
                .collect(Collectors.toList());
    }
}
