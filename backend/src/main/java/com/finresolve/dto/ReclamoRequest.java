package com.finresolve.dto;

import java.math.BigDecimal;

public class ReclamoRequest {

    private Long clientePersonaId;
    private Long canalReclamoId;
    private Long categoriaReclamoId;
    private String descripcion;
    private BigDecimal montoReclamo;
    private Boolean indisponibilidadDigital;
    private Long empresaId;
    private Long usuIdCreacion;

    public ReclamoRequest() {
    }

    public ReclamoRequest(Long clientePersonaId, Long canalReclamoId, Long categoriaReclamoId,
                          String descripcion, BigDecimal montoReclamo, Boolean indisponibilidadDigital,
                          Long empresaId, Long usuIdCreacion) {
        this.clientePersonaId = clientePersonaId;
        this.canalReclamoId = canalReclamoId;
        this.categoriaReclamoId = categoriaReclamoId;
        this.descripcion = descripcion;
        this.montoReclamo = montoReclamo;
        this.indisponibilidadDigital = indisponibilidadDigital;
        this.empresaId = empresaId;
        this.usuIdCreacion = usuIdCreacion;
    }

    public Long getClientePersonaId() {
        return clientePersonaId;
    }

    public void setClientePersonaId(Long clientePersonaId) {
        this.clientePersonaId = clientePersonaId;
    }

    public Long getCanalReclamoId() {
        return canalReclamoId;
    }

    public void setCanalReclamoId(Long canalReclamoId) {
        this.canalReclamoId = canalReclamoId;
    }

    public Long getCategoriaReclamoId() {
        return categoriaReclamoId;
    }

    public void setCategoriaReclamoId(Long categoriaReclamoId) {
        this.categoriaReclamoId = categoriaReclamoId;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public BigDecimal getMontoReclamo() {
        return montoReclamo;
    }

    public void setMontoReclamo(BigDecimal montoReclamo) {
        this.montoReclamo = montoReclamo;
    }

    public Boolean getIndisponibilidadDigital() {
        return indisponibilidadDigital;
    }

    public void setIndisponibilidadDigital(Boolean indisponibilidadDigital) {
        this.indisponibilidadDigital = indisponibilidadDigital;
    }

    public Long getEmpresaId() {
        return empresaId;
    }

    public void setEmpresaId(Long empresaId) {
        this.empresaId = empresaId;
    }

    public Long getUsuIdCreacion() {
        return usuIdCreacion;
    }

    public void setUsuIdCreacion(Long usuIdCreacion) {
        this.usuIdCreacion = usuIdCreacion;
    }
}
