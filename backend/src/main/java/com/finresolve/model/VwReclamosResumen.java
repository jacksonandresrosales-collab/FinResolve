package com.finresolve.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.Immutable;

@Entity
@Table(name = "vw_reclamos_resumen")
@Immutable
public class VwReclamosResumen {

    @Id
    @Column(name = "reclamo_id")
    private Long reclamoId;

    @Column(name = "codigo", length = 30)
    private String codigo;

    @Column(name = "cliente")
    private String cliente;

    @Column(name = "canal", length = 80)
    private String canal;

    @Column(name = "categoria", length = 100)
    private String categoria;

    @Column(name = "estado_reclamo", length = 60)
    private String estadoReclamo;

    @Column(name = "prioridad", length = 40)
    private String prioridad;

    @Column(name = "puntaje")
    private Integer puntaje;

    @Column(name = "monto_reclamo", precision = 10, scale = 2)
    private BigDecimal montoReclamo;

    @Column(name = "fecha_reclamo")
    private LocalDateTime fechaReclamo;

    @Column(name = "fecha_limite")
    private LocalDateTime fechaLimite;

    @Column(name = "estado_sla")
    private String estadoSla;

    @Column(name = "analista")
    private String analista;

    public VwReclamosResumen() {
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

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getCanal() {
        return canal;
    }

    public void setCanal(String canal) {
        this.canal = canal;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getEstadoReclamo() {
        return estadoReclamo;
    }

    public void setEstadoReclamo(String estadoReclamo) {
        this.estadoReclamo = estadoReclamo;
    }

    public String getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(String prioridad) {
        this.prioridad = prioridad;
    }

    public Integer getPuntaje() {
        return puntaje;
    }

    public void setPuntaje(Integer puntaje) {
        this.puntaje = puntaje;
    }

    public BigDecimal getMontoReclamo() {
        return montoReclamo;
    }

    public void setMontoReclamo(BigDecimal montoReclamo) {
        this.montoReclamo = montoReclamo;
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

    public String getEstadoSla() {
        return estadoSla;
    }

    public void setEstadoSla(String estadoSla) {
        this.estadoSla = estadoSla;
    }

    public String getAnalista() {
        return analista;
    }

    public void setAnalista(String analista) {
        this.analista = analista;
    }
}
