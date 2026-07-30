package com.finresolve.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reclamo_historial")
public class ReclamoHistorial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reclamo_historial_id")
    private Long reclamoHistorialId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reclamo_id", nullable = false)
    private Reclamo reclamo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_actor_id", nullable = false)
    private Usuario usuarioActor;

    @Column(name = "tipo_evento", nullable = false, length = 60)
    private String tipoEvento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_anterior_id")
    private EstadoReclamo estadoAnterior;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_nuevo_id")
    private EstadoReclamo estadoNuevo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "analista_anterior_id")
    private Usuario analistaAnterior;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "analista_nuevo_id")
    private Usuario analistaNuevo;

    @Column(name = "observacion", nullable = false, length = 500)
    private String observacion;

    @Column(name = "fecha_evento", nullable = false)
    private LocalDateTime fechaEvento;

    public ReclamoHistorial() {
    }

    public Long getReclamoHistorialId() {
        return reclamoHistorialId;
    }

    public void setReclamoHistorialId(Long reclamoHistorialId) {
        this.reclamoHistorialId = reclamoHistorialId;
    }

    public Reclamo getReclamo() {
        return reclamo;
    }

    public void setReclamo(Reclamo reclamo) {
        this.reclamo = reclamo;
    }

    public Usuario getUsuarioActor() {
        return usuarioActor;
    }

    public void setUsuarioActor(Usuario usuarioActor) {
        this.usuarioActor = usuarioActor;
    }

    public String getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(String tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public EstadoReclamo getEstadoAnterior() {
        return estadoAnterior;
    }

    public void setEstadoAnterior(EstadoReclamo estadoAnterior) {
        this.estadoAnterior = estadoAnterior;
    }

    public EstadoReclamo getEstadoNuevo() {
        return estadoNuevo;
    }

    public void setEstadoNuevo(EstadoReclamo estadoNuevo) {
        this.estadoNuevo = estadoNuevo;
    }

    public Usuario getAnalistaAnterior() {
        return analistaAnterior;
    }

    public void setAnalistaAnterior(Usuario analistaAnterior) {
        this.analistaAnterior = analistaAnterior;
    }

    public Usuario getAnalistaNuevo() {
        return analistaNuevo;
    }

    public void setAnalistaNuevo(Usuario analistaNuevo) {
        this.analistaNuevo = analistaNuevo;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public LocalDateTime getFechaEvento() {
        return fechaEvento;
    }

    public void setFechaEvento(LocalDateTime fechaEvento) {
        this.fechaEvento = fechaEvento;
    }
}
