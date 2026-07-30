package com.finresolve.dto;

import java.time.LocalDateTime;

public class ReclamoHistorialResponse {

    private Long reclamoHistorialId;
    private String usuarioActorNombre;
    private String tipoEvento;
    private String estadoAnteriorDescripcion;
    private String estadoNuevoDescripcion;
    private String analistaAnteriorNombre;
    private String analistaNuevoNombre;
    private String observacion;
    private LocalDateTime fechaEvento;

    public ReclamoHistorialResponse() {
    }

    public ReclamoHistorialResponse(Long reclamoHistorialId, String usuarioActorNombre,
                                    String tipoEvento, String estadoAnteriorDescripcion,
                                    String estadoNuevoDescripcion, String analistaAnteriorNombre,
                                    String analistaNuevoNombre, String observacion,
                                    LocalDateTime fechaEvento) {
        this.reclamoHistorialId = reclamoHistorialId;
        this.usuarioActorNombre = usuarioActorNombre;
        this.tipoEvento = tipoEvento;
        this.estadoAnteriorDescripcion = estadoAnteriorDescripcion;
        this.estadoNuevoDescripcion = estadoNuevoDescripcion;
        this.analistaAnteriorNombre = analistaAnteriorNombre;
        this.analistaNuevoNombre = analistaNuevoNombre;
        this.observacion = observacion;
        this.fechaEvento = fechaEvento;
    }

    public Long getReclamoHistorialId() {
        return reclamoHistorialId;
    }

    public void setReclamoHistorialId(Long reclamoHistorialId) {
        this.reclamoHistorialId = reclamoHistorialId;
    }

    public String getUsuarioActorNombre() {
        return usuarioActorNombre;
    }

    public void setUsuarioActorNombre(String usuarioActorNombre) {
        this.usuarioActorNombre = usuarioActorNombre;
    }

    public String getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(String tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public String getEstadoAnteriorDescripcion() {
        return estadoAnteriorDescripcion;
    }

    public void setEstadoAnteriorDescripcion(String estadoAnteriorDescripcion) {
        this.estadoAnteriorDescripcion = estadoAnteriorDescripcion;
    }

    public String getEstadoNuevoDescripcion() {
        return estadoNuevoDescripcion;
    }

    public void setEstadoNuevoDescripcion(String estadoNuevoDescripcion) {
        this.estadoNuevoDescripcion = estadoNuevoDescripcion;
    }

    public String getAnalistaAnteriorNombre() {
        return analistaAnteriorNombre;
    }

    public void setAnalistaAnteriorNombre(String analistaAnteriorNombre) {
        this.analistaAnteriorNombre = analistaAnteriorNombre;
    }

    public String getAnalistaNuevoNombre() {
        return analistaNuevoNombre;
    }

    public void setAnalistaNuevoNombre(String analistaNuevoNombre) {
        this.analistaNuevoNombre = analistaNuevoNombre;
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
