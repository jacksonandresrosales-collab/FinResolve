package com.finresolve.dto;

public class CambioEstadoRequest {

    private Long estadoReclamoId;
    private String observacion;
    private Long usuarioActorId;

    public CambioEstadoRequest() {
    }

    public CambioEstadoRequest(Long estadoReclamoId, String observacion, Long usuarioActorId) {
        this.estadoReclamoId = estadoReclamoId;
        this.observacion = observacion;
        this.usuarioActorId = usuarioActorId;
    }

    public Long getEstadoReclamoId() {
        return estadoReclamoId;
    }

    public void setEstadoReclamoId(Long estadoReclamoId) {
        this.estadoReclamoId = estadoReclamoId;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public Long getUsuarioActorId() {
        return usuarioActorId;
    }

    public void setUsuarioActorId(Long usuarioActorId) {
        this.usuarioActorId = usuarioActorId;
    }
}
