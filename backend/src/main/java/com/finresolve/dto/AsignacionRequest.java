package com.finresolve.dto;

public class AsignacionRequest {

    private Long analistaUsuarioId;
    private Long usuarioActorId;

    public AsignacionRequest() {
    }

    public AsignacionRequest(Long analistaUsuarioId, Long usuarioActorId) {
        this.analistaUsuarioId = analistaUsuarioId;
        this.usuarioActorId = usuarioActorId;
    }

    public Long getAnalistaUsuarioId() {
        return analistaUsuarioId;
    }

    public void setAnalistaUsuarioId(Long analistaUsuarioId) {
        this.analistaUsuarioId = analistaUsuarioId;
    }

    public Long getUsuarioActorId() {
        return usuarioActorId;
    }

    public void setUsuarioActorId(Long usuarioActorId) {
        this.usuarioActorId = usuarioActorId;
    }
}
