package com.finresolve.dto;

import java.util.List;

public class UsuarioResponse {

    private Long usuarioId;
    private String nombre;
    private String personaNombre;
    private List<Long> rolIds;

    public UsuarioResponse() {
    }

    public UsuarioResponse(Long usuarioId, String nombre, String personaNombre,
                           List<Long> rolIds) {
        this.usuarioId = usuarioId;
        this.nombre = nombre;
        this.personaNombre = personaNombre;
        this.rolIds = rolIds;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPersonaNombre() {
        return personaNombre;
    }

    public void setPersonaNombre(String personaNombre) {
        this.personaNombre = personaNombre;
    }

    public List<Long> getRolIds() {
        return rolIds;
    }

    public void setRolIds(List<Long> rolIds) {
        this.rolIds = rolIds;
    }
}
