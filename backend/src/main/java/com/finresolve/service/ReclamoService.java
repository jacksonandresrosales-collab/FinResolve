package com.finresolve.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.finresolve.dto.AsignacionRequest;
import com.finresolve.dto.CambioEstadoRequest;
import com.finresolve.dto.ReclamoDetalleResponse;
import com.finresolve.dto.ReclamoHistorialResponse;
import com.finresolve.dto.ReclamoRequest;
import com.finresolve.dto.ReclamoResponse;
import com.finresolve.exception.ResourceNotFoundException;
import com.finresolve.model.CategoriaReclamo;
import com.finresolve.model.EstadoReclamo;
import com.finresolve.model.Persona;
import com.finresolve.model.Prioridad;
import com.finresolve.model.Reclamo;
import com.finresolve.model.ReclamoHistorial;
import com.finresolve.model.Sla;
import com.finresolve.model.Usuario;
import com.finresolve.repository.CanalReclamoRepository;
import com.finresolve.repository.CategoriaReclamoRepository;
import com.finresolve.repository.EmpresaRepository;
import com.finresolve.repository.EstadoReclamoRepository;
import com.finresolve.repository.EstadoRepository;
import com.finresolve.repository.PersonaRepository;
import com.finresolve.repository.PrioridadRepository;
import com.finresolve.repository.ReclamoHistorialRepository;
import com.finresolve.repository.ReclamoRepository;
import com.finresolve.repository.SlaRepository;
import com.finresolve.repository.UsuarioRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

@Service
@Transactional
public class ReclamoService {

    private final ReclamoRepository reclamoRepository;
    private final ReclamoHistorialRepository reclamoHistorialRepository;
    private final PrioridadRepository prioridadRepository;
    private final SlaRepository slaRepository;
    private final CanalReclamoRepository canalReclamoRepository;
    private final CategoriaReclamoRepository categoriaReclamoRepository;
    private final PersonaRepository personaRepository;
    private final UsuarioRepository usuarioRepository;
    private final EstadoReclamoRepository estadoReclamoRepository;
    private final EstadoRepository estadoRepository;
    private final EmpresaRepository empresaRepository;
    private final EntityManager entityManager;

    @Autowired
    public ReclamoService(ReclamoRepository reclamoRepository,
                          ReclamoHistorialRepository reclamoHistorialRepository,
                          PrioridadRepository prioridadRepository,
                          SlaRepository slaRepository,
                          CanalReclamoRepository canalReclamoRepository,
                          CategoriaReclamoRepository categoriaReclamoRepository,
                          PersonaRepository personaRepository,
                          UsuarioRepository usuarioRepository,
                          EstadoReclamoRepository estadoReclamoRepository,
                          EstadoRepository estadoRepository,
                          EmpresaRepository empresaRepository,
                          EntityManager entityManager) {
        this.reclamoRepository = reclamoRepository;
        this.reclamoHistorialRepository = reclamoHistorialRepository;
        this.prioridadRepository = prioridadRepository;
        this.slaRepository = slaRepository;
        this.canalReclamoRepository = canalReclamoRepository;
        this.categoriaReclamoRepository = categoriaReclamoRepository;
        this.personaRepository = personaRepository;
        this.usuarioRepository = usuarioRepository;
        this.estadoReclamoRepository = estadoReclamoRepository;
        this.estadoRepository = estadoRepository;
        this.empresaRepository = empresaRepository;
        this.entityManager = entityManager;
    }

    @Transactional(readOnly = true)
    public List<ReclamoResponse> listarTodos() {
        return reclamoRepository.findAll(Sort.by(Sort.Direction.DESC, "fechaReclamo"))
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ReclamoDetalleResponse obtenerPorId(Long id) {
        Reclamo reclamo = reclamoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reclamo", id));

        ReclamoDetalleResponse response = mapToDetalleResponse(reclamo);

        List<ReclamoHistorialResponse> historial = reclamoHistorialRepository
                .findByReclamo_ReclamoIdOrderByFechaEventoAsc(id)
                .stream()
                .map(this::mapToHistorialResponse)
                .collect(Collectors.toList());

        response.setHistorial(historial);
        return response;
    }

    public ReclamoResponse crear(ReclamoRequest request) {
        LocalDateTime now = LocalDateTime.now();
        String year = String.valueOf(Year.now().getValue());
        String prefix = "FR-" + year + "-";
        String maxCodigo = null;
        Query query = entityManager.createQuery(
                "SELECT MAX(r.codigo) FROM Reclamo r WHERE r.codigo LIKE :prefix");
        query.setParameter("prefix", prefix + "%");
        maxCodigo = (String) query.getSingleResult();

        int nextNumber = 1;
        if (maxCodigo != null) {
            String numPart = maxCodigo.substring(prefix.length());
            nextNumber = Integer.parseInt(numPart) + 1;
        }
        String codigo = prefix + String.format("%04d", nextNumber);

        Persona cliente = personaRepository.findById(request.getClientePersonaId())
                .orElseThrow(() -> new ResourceNotFoundException("Persona", request.getClientePersonaId()));

        CategoriaReclamo categoria = categoriaReclamoRepository.findById(request.getCategoriaReclamoId())
                .orElseThrow(() -> new ResourceNotFoundException("CategoriaReclamo", request.getCategoriaReclamoId()));

        int puntaje = calcularPuntaje(categoria, request.getMontoReclamo(),
                request.getIndisponibilidadDigital(), now);

        Prioridad prioridad = prioridadRepository.findAll().stream()
                .filter(p -> puntaje >= p.getPuntajeMinimo()
                        && (p.getPuntajeMaximo() == null || puntaje <= p.getPuntajeMaximo()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No prioridad found for puntaje: " + puntaje));

        Sla sla = slaRepository.findByPrioridad_PrioridadId(prioridad.getPrioridadId())
                .orElseThrow(() -> new RuntimeException("No SLA found for prioridad: " + prioridad.getPrioridadId()));

        EstadoReclamo estadoReclamo = estadoReclamoRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("EstadoReclamo", 1L));

        Usuario usuarioCreacion = usuarioRepository.findById(request.getUsuIdCreacion())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", request.getUsuIdCreacion()));

        Reclamo reclamo = new Reclamo();
        reclamo.setCodigo(codigo);
        reclamo.setCliente(cliente);
        reclamo.setCanalReclamo(canalReclamoRepository.findById(request.getCanalReclamoId())
                .orElseThrow(() -> new ResourceNotFoundException("CanalReclamo", request.getCanalReclamoId())));
        reclamo.setCategoriaReclamo(categoria);
        reclamo.setDescripcion(request.getDescripcion());
        reclamo.setMontoReclamo(request.getMontoReclamo());
        reclamo.setIndisponibilidadDigital(request.getIndisponibilidadDigital());
        reclamo.setPuntaje(puntaje);
        reclamo.setPrioridad(prioridad);
        reclamo.setSla(sla);
        reclamo.setEstadoReclamo(estadoReclamo);
        reclamo.setFechaReclamo(now);
        reclamo.setFechaLimite(now.plusHours(sla.getHorasLimite()));
        reclamo.setEstado(estadoRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("Estado", 1L)));
        reclamo.setEmpresa(empresaRepository.findById(request.getEmpresaId())
                .orElseThrow(() -> new ResourceNotFoundException("Empresa", request.getEmpresaId())));
        reclamo.setUsuarioCreacion(usuarioCreacion);
        reclamo.setFechaCreacion(now);

        reclamo = reclamoRepository.save(reclamo);

        ReclamoHistorial historial = new ReclamoHistorial();
        historial.setReclamo(reclamo);
        historial.setUsuarioActor(usuarioCreacion);
        historial.setTipoEvento("CREACION");
        historial.setEstadoNuevo(estadoReclamo);
        historial.setObservacion("Reclamo creado");
        historial.setFechaEvento(now);
        reclamoHistorialRepository.save(historial);

        return mapToResponse(reclamo);
    }

    public ReclamoResponse asignar(Long reclamoId, AsignacionRequest request) {
        Reclamo reclamo = reclamoRepository.findById(reclamoId)
                .orElseThrow(() -> new ResourceNotFoundException("Reclamo", reclamoId));

        Usuario analistaAnterior = reclamo.getAnalista();
        Usuario analistaNuevo = usuarioRepository.findById(request.getAnalistaUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", request.getAnalistaUsuarioId()));

        Usuario usuarioActor = usuarioRepository.findById(request.getUsuarioActorId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", request.getUsuarioActorId()));

        reclamo.setAnalista(analistaNuevo);
        reclamo.setFechaModificacion(LocalDateTime.now());
        reclamo = reclamoRepository.save(reclamo);

        ReclamoHistorial historial = new ReclamoHistorial();
        historial.setReclamo(reclamo);
        historial.setUsuarioActor(usuarioActor);
        historial.setTipoEvento("ASIGNACION");
        historial.setAnalistaAnterior(analistaAnterior);
        historial.setAnalistaNuevo(analistaNuevo);
        historial.setObservacion("Asignacion de analista");
        historial.setFechaEvento(LocalDateTime.now());
        reclamoHistorialRepository.save(historial);

        return mapToResponse(reclamo);
    }

    public ReclamoResponse cambiarEstado(Long reclamoId, CambioEstadoRequest request) {
        Reclamo reclamo = reclamoRepository.findById(reclamoId)
                .orElseThrow(() -> new ResourceNotFoundException("Reclamo", reclamoId));

        EstadoReclamo estadoAnterior = reclamo.getEstadoReclamo();
        EstadoReclamo estadoNuevo = estadoReclamoRepository.findById(request.getEstadoReclamoId())
                .orElseThrow(() -> new ResourceNotFoundException("EstadoReclamo", request.getEstadoReclamoId()));

        Usuario usuarioActor = usuarioRepository.findById(request.getUsuarioActorId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", request.getUsuarioActorId()));

        reclamo.setEstadoReclamo(estadoNuevo);
        reclamo.setFechaModificacion(LocalDateTime.now());
        reclamo = reclamoRepository.save(reclamo);

        ReclamoHistorial historial = new ReclamoHistorial();
        historial.setReclamo(reclamo);
        historial.setUsuarioActor(usuarioActor);
        historial.setTipoEvento("CAMBIO_ESTADO");
        historial.setEstadoAnterior(estadoAnterior);
        historial.setEstadoNuevo(estadoNuevo);
        historial.setObservacion(request.getObservacion());
        historial.setFechaEvento(LocalDateTime.now());
        reclamoHistorialRepository.save(historial);

        return mapToResponse(reclamo);
    }

    @Transactional(readOnly = true)
    public List<ReclamoResponse> listarPorEstado(Long estadoReclamoId) {
        return reclamoRepository.findByEstadoReclamo_EstadoReclamoId(estadoReclamoId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReclamoResponse> listarPorAnalista(Long usuarioId) {
        return reclamoRepository.findByAnalista_UsuarioId(usuarioId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public int calcularPuntaje(CategoriaReclamo categoria, BigDecimal monto,
                                       Boolean indisponibilidadDigital, LocalDateTime fechaReclamo) {
        int puntaje = categoria.getPuntosBase();

        if (monto != null && monto.compareTo(new BigDecimal("500")) >= 0) {
            puntaje += 3;
        }

        if (Boolean.TRUE.equals(indisponibilidadDigital)) {
            puntaje += 2;
        }

        if (fechaReclamo != null && fechaReclamo.plusHours(24).isBefore(LocalDateTime.now())) {
            puntaje += 2;
        }

        return puntaje;
    }

    private ReclamoResponse mapToResponse(Reclamo reclamo) {
        ReclamoResponse response = new ReclamoResponse();
        response.setReclamoId(reclamo.getReclamoId());
        response.setCodigo(reclamo.getCodigo());
        response.setClienteNombre(getNombreCompleto(reclamo.getCliente()));
        response.setCanalDescripcion(reclamo.getCanalReclamo().getCanalDescripcion());
        response.setCategoriaDescripcion(reclamo.getCategoriaReclamo().getCategoriaDescripcion());
        response.setDescripcion(reclamo.getDescripcion());
        response.setMontoReclamo(reclamo.getMontoReclamo());
        response.setIndisponibilidadDigital(reclamo.getIndisponibilidadDigital());
        response.setPuntaje(reclamo.getPuntaje());
        response.setPrioridadDescripcion(reclamo.getPrioridad().getPrioridadDescripcion());
        response.setSlaDescripcion(reclamo.getSla().getSlaDescripcion());
        response.setEstadoReclamoDescripcion(reclamo.getEstadoReclamo().getEstadoReclamoDescripcion());
        if (reclamo.getAnalista() != null) {
            response.setAnalistaNombre(getNombreCompleto(reclamo.getAnalista().getPersona()));
        }
        response.setFechaReclamo(reclamo.getFechaReclamo());
        response.setFechaLimite(reclamo.getFechaLimite());
        response.setFechaCreacion(reclamo.getFechaCreacion());
        return response;
    }

    private ReclamoDetalleResponse mapToDetalleResponse(Reclamo reclamo) {
        ReclamoDetalleResponse response = new ReclamoDetalleResponse();
        response.setReclamoId(reclamo.getReclamoId());
        response.setCodigo(reclamo.getCodigo());
        response.setClienteNombre(getNombreCompleto(reclamo.getCliente()));
        response.setCanalDescripcion(reclamo.getCanalReclamo().getCanalDescripcion());
        response.setCategoriaDescripcion(reclamo.getCategoriaReclamo().getCategoriaDescripcion());
        response.setDescripcion(reclamo.getDescripcion());
        response.setMontoReclamo(reclamo.getMontoReclamo());
        response.setIndisponibilidadDigital(reclamo.getIndisponibilidadDigital());
        response.setPuntaje(reclamo.getPuntaje());
        response.setPrioridadDescripcion(reclamo.getPrioridad().getPrioridadDescripcion());
        response.setSlaDescripcion(reclamo.getSla().getSlaDescripcion());
        response.setEstadoReclamoDescripcion(reclamo.getEstadoReclamo().getEstadoReclamoDescripcion());
        if (reclamo.getAnalista() != null) {
            response.setAnalistaNombre(getNombreCompleto(reclamo.getAnalista().getPersona()));
        }
        response.setFechaReclamo(reclamo.getFechaReclamo());
        response.setFechaLimite(reclamo.getFechaLimite());
        response.setFechaCreacion(reclamo.getFechaCreacion());

        Persona cliente = reclamo.getCliente();
        response.setClienteIdentificacion(cliente.getIdentificacion());
        response.setClienteDireccion(cliente.getDireccion());
        response.setClienteTelefono(cliente.getTelefono());
        response.setClienteCorreo(cliente.getCorreoElectronico());

        return response;
    }

    private ReclamoHistorialResponse mapToHistorialResponse(ReclamoHistorial historial) {
        ReclamoHistorialResponse response = new ReclamoHistorialResponse();
        response.setReclamoHistorialId(historial.getReclamoHistorialId());
        response.setUsuarioActorNombre(
                historial.getUsuarioActor().getPersona().getNombre1() + " "
                + historial.getUsuarioActor().getPersona().getApellido1());
        response.setTipoEvento(historial.getTipoEvento());
        if (historial.getEstadoAnterior() != null) {
            response.setEstadoAnteriorDescripcion(historial.getEstadoAnterior().getEstadoReclamoDescripcion());
        }
        if (historial.getEstadoNuevo() != null) {
            response.setEstadoNuevoDescripcion(historial.getEstadoNuevo().getEstadoReclamoDescripcion());
        }
        if (historial.getAnalistaAnterior() != null) {
            response.setAnalistaAnteriorNombre(
                    historial.getAnalistaAnterior().getPersona().getNombre1() + " "
                    + historial.getAnalistaAnterior().getPersona().getApellido1());
        }
        if (historial.getAnalistaNuevo() != null) {
            response.setAnalistaNuevoNombre(
                    historial.getAnalistaNuevo().getPersona().getNombre1() + " "
                    + historial.getAnalistaNuevo().getPersona().getApellido1());
        }
        response.setObservacion(historial.getObservacion());
        response.setFechaEvento(historial.getFechaEvento());
        return response;
    }

    private String getNombreCompleto(Persona persona) {
        StringBuilder sb = new StringBuilder();
        sb.append(persona.getNombre1());
        if (persona.getNombre2() != null && !persona.getNombre2().isEmpty()) {
            sb.append(" ").append(persona.getNombre2());
        }
        sb.append(" ").append(persona.getApellido1());
        if (persona.getApellido2() != null && !persona.getApellido2().isEmpty()) {
            sb.append(" ").append(persona.getApellido2());
        }
        return sb.toString();
    }
}
