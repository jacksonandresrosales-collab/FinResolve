package com.finresolve.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.finresolve.dto.ReclamoResponse;
import com.finresolve.dto.TableroResponse;
import com.finresolve.model.Reclamo;
import com.finresolve.model.VwReclamosResumen;
import com.finresolve.model.VwTableroOperativo;
import com.finresolve.repository.ReclamoRepository;
import com.finresolve.repository.VwReclamosResumenRepository;
import com.finresolve.repository.VwTableroOperativoRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Service
@Transactional(readOnly = true)
public class TableroService {

    private final ReclamoRepository reclamoRepository;
    private final VwTableroOperativoRepository vwTableroOperativoRepository;
    private final VwReclamosResumenRepository vwReclamosResumenRepository;
    private final EntityManager entityManager;

    @Autowired
    public TableroService(ReclamoRepository reclamoRepository,
                          VwTableroOperativoRepository vwTableroOperativoRepository,
                          VwReclamosResumenRepository vwReclamosResumenRepository,
                          EntityManager entityManager) {
        this.reclamoRepository = reclamoRepository;
        this.vwTableroOperativoRepository = vwTableroOperativoRepository;
        this.vwReclamosResumenRepository = vwReclamosResumenRepository;
        this.entityManager = entityManager;
    }

    public TableroResponse obtenerTablero() {
        TableroResponse response = new TableroResponse();

        response.setTotalReclamos(reclamoRepository.count());
        response.setPendientes(reclamoRepository.countByEstadoReclamo_EstadoReclamoId(1L));
        response.setEnAnalisis(reclamoRepository.countByEstadoReclamo_EstadoReclamoId(2L));
        response.setResueltos(reclamoRepository.countByEstadoReclamo_EstadoReclamoId(3L));
        response.setRechazados(reclamoRepository.countByEstadoReclamo_EstadoReclamoId(4L));
        response.setCriticos(reclamoRepository.countByPrioridad_PrioridadId(4L));
        response.setAltos(reclamoRepository.countByPrioridad_PrioridadId(3L));
        response.setMedios(reclamoRepository.countByPrioridad_PrioridadId(2L));
        response.setBajos(reclamoRepository.countByPrioridad_PrioridadId(1L));

        TypedQuery<Long> vencidosQuery = entityManager.createQuery(
                "SELECT COUNT(r) FROM Reclamo r WHERE r.fechaLimite < :now AND r.estadoReclamo.estadoReclamoId NOT IN :estadosFinales",
                Long.class);
        vencidosQuery.setParameter("now", LocalDateTime.now());
        vencidosQuery.setParameter("estadosFinales", List.of(3L, 4L));
        response.setVencidos(vencidosQuery.getSingleResult());

        List<ReclamoResponse> ultimos = reclamoRepository
                .findAll(Sort.by(Sort.Direction.DESC, "fechaReclamo"))
                .stream()
                .limit(5)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        response.setUltimosReclamos(ultimos);

        return response;
    }

    public List<VwTableroOperativo> obtenerTableroVista() {
        return vwTableroOperativoRepository.findAll();
    }

    public List<VwReclamosResumen> obtenerReclamosResumen() {
        return vwReclamosResumenRepository.findAll();
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

    private String getNombreCompleto(com.finresolve.model.Persona persona) {
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
