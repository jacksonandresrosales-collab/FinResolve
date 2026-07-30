package com.finresolve.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ReclamoResponse {

    private Long reclamoId;
    private String codigo;
    private String clienteNombre;
    private String canalDescripcion;
    private String categoriaDescripcion;
    private String descripcion;
    private BigDecimal montoReclamo;
    private Boolean indisponibilidadDigital;
    private Integer puntaje;
    private String prioridadDescripcion;
    private String slaDescripcion;
    private String estadoReclamoDescripcion;
    private String analistaNombre;
    private LocalDateTime fechaReclamo;
    private LocalDateTime fechaLimite;
    private LocalDateTime fechaCreacion;

    public ReclamoResponse() {
    }

    public ReclamoResponse(Long reclamoId, String codigo, String clienteNombre,
                           String canalDescripcion, String categoriaDescripcion,
                           String descripcion, BigDecimal montoReclamo,
                           Boolean indisponibilidadDigital, Integer puntaje,
                           String prioridadDescripcion, String slaDescripcion,
                           String estadoReclamoDescripcion, String analistaNombre,
                           LocalDateTime fechaReclamo, LocalDateTime fechaLimite,
                           LocalDateTime fechaCreacion) {
        this.reclamoId = reclamoId;
        this.codigo = codigo;
        this.clienteNombre = clienteNombre;
        this.canalDescripcion = canalDescripcion;
        this.categoriaDescripcion = categoriaDescripcion;
        this.descripcion = descripcion;
        this.montoReclamo = montoReclamo;
        this.indisponibilidadDigital = indisponibilidadDigital;
        this.puntaje = puntaje;
        this.prioridadDescripcion = prioridadDescripcion;
        this.slaDescripcion = slaDescripcion;
        this.estadoReclamoDescripcion = estadoReclamoDescripcion;
        this.analistaNombre = analistaNombre;
        this.fechaReclamo = fechaReclamo;
        this.fechaLimite = fechaLimite;
        this.fechaCreacion = fechaCreacion;
    }

    public Long getReclamoId() {
        return reclamoId;
    }

    public void setReclamoId(Long reclamoId) {
        this.reclamoId = reclamoId;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getClienteNombre() {
        return clienteNombre;
    }

    public void setClienteNombre(String clienteNombre) {
        this.clienteNombre = clienteNombre;
    }

    public String getCanalDescripcion() {
        return canalDescripcion;
    }

    public void setCanalDescripcion(String canalDescripcion) {
        this.canalDescripcion = canalDescripcion;
    }

    public String getCategoriaDescripcion() {
        return categoriaDescripcion;
    }

    public void setCategoriaDescripcion(String categoriaDescripcion) {
        this.categoriaDescripcion = categoriaDescripcion;
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

    public Integer getPuntaje() {
        return puntaje;
    }

    public void setPuntaje(Integer puntaje) {
        this.puntaje = puntaje;
    }

    public String getPrioridadDescripcion() {
        return prioridadDescripcion;
    }

    public void setPrioridadDescripcion(String prioridadDescripcion) {
        this.prioridadDescripcion = prioridadDescripcion;
    }

    public String getSlaDescripcion() {
        return slaDescripcion;
    }

    public void setSlaDescripcion(String slaDescripcion) {
        this.slaDescripcion = slaDescripcion;
    }

    public String getEstadoReclamoDescripcion() {
        return estadoReclamoDescripcion;
    }

    public void setEstadoReclamoDescripcion(String estadoReclamoDescripcion) {
        this.estadoReclamoDescripcion = estadoReclamoDescripcion;
    }

    public String getAnalistaNombre() {
        return analistaNombre;
    }

    public void setAnalistaNombre(String analistaNombre) {
        this.analistaNombre = analistaNombre;
    }

    public LocalDateTime getFechaReclamo() {
        return fechaReclamo;
    }

    public void setFechaReclamo(LocalDateTime fechaReclamo) {
        this.fechaReclamo = fechaReclamo;
    }

    public LocalDateTime getFechaLimite() {
        return fechaLimite;
    }

    public void setFechaLimite(LocalDateTime fechaLimite) {
        this.fechaLimite = fechaLimite;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }
}
