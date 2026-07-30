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
@Table(name = "estado_reclamo")
public class EstadoReclamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "estado_reclamo_id")
    private Long estadoReclamoId;

    @Column(name = "estado_reclamo_descripcion", nullable = false, length = 60, unique = true)
    private String estadoReclamoDescripcion;

    @Column(name = "es_estado_final", nullable = false)
    private Boolean esEstadoFinal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_id", nullable = false)
    private Estado estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    public EstadoReclamo() {
    }

    public EstadoReclamo(Long estadoReclamoId) {
        this.estadoReclamoId = estadoReclamoId;
    }

    public Long getEstadoReclamoId() {
        return estadoReclamoId;
    }

    public void setEstadoReclamoId(Long estadoReclamoId) {
        this.estadoReclamoId = estadoReclamoId;
    }

    public String getEstadoReclamoDescripcion() {
        return estadoReclamoDescripcion;
    }

    public void setEstadoReclamoDescripcion(String estadoReclamoDescripcion) {
        this.estadoReclamoDescripcion = estadoReclamoDescripcion;
    }

    public Boolean getEsEstadoFinal() {
        return esEstadoFinal;
    }

    public void setEsEstadoFinal(Boolean esEstadoFinal) {
        this.esEstadoFinal = esEstadoFinal;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }
}
