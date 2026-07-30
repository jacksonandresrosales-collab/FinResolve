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
@Table(name = "prioridad")
public class Prioridad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prioridad_id")
    private Long prioridadId;

    @Column(name = "prioridad_descripcion", nullable = false, length = 40, unique = true)
    private String prioridadDescripcion;

    @Column(name = "puntaje_minimo", nullable = false)
    private Integer puntajeMinimo;

    @Column(name = "puntaje_maximo")
    private Integer puntajeMaximo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_id", nullable = false)
    private Estado estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    public Prioridad() {
    }

    public Prioridad(Long prioridadId) {
        this.prioridadId = prioridadId;
    }

    public Long getPrioridadId() {
        return prioridadId;
    }

    public void setPrioridadId(Long prioridadId) {
        this.prioridadId = prioridadId;
    }

    public String getPrioridadDescripcion() {
        return prioridadDescripcion;
    }

    public void setPrioridadDescripcion(String prioridadDescripcion) {
        this.prioridadDescripcion = prioridadDescripcion;
    }

    public Integer getPuntajeMinimo() {
        return puntajeMinimo;
    }

    public void setPuntajeMinimo(Integer puntajeMinimo) {
        this.puntajeMinimo = puntajeMinimo;
    }

    public Integer getPuntajeMaximo() {
        return puntajeMaximo;
    }

    public void setPuntajeMaximo(Integer puntajeMaximo) {
        this.puntajeMaximo = puntajeMaximo;
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
