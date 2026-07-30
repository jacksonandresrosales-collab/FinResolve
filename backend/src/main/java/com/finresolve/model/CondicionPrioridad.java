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
@Table(name = "condicion_prioridad")
public class CondicionPrioridad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "condicion_prioridad_id")
    private Long condicionPrioridadId;

    @Column(name = "condicion_descripcion", nullable = false, length = 150)
    private String condicionDescripcion;

    @Column(name = "puntos", nullable = false)
    private Integer puntos;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_id", nullable = false)
    private Estado estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    public CondicionPrioridad() {
    }

    public CondicionPrioridad(Long condicionPrioridadId) {
        this.condicionPrioridadId = condicionPrioridadId;
    }

    public Long getCondicionPrioridadId() {
        return condicionPrioridadId;
    }

    public void setCondicionPrioridadId(Long condicionPrioridadId) {
        this.condicionPrioridadId = condicionPrioridadId;
    }

    public String getCondicionDescripcion() {
        return condicionDescripcion;
    }

    public void setCondicionDescripcion(String condicionDescripcion) {
        this.condicionDescripcion = condicionDescripcion;
    }

    public Integer getPuntos() {
        return puntos;
    }

    public void setPuntos(Integer puntos) {
        this.puntos = puntos;
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
