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
@Table(name = "categoria_reclamo")
public class CategoriaReclamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categoria_reclamo_id")
    private Long categoriaReclamoId;

    @Column(name = "categoria_descripcion", nullable = false, length = 100, unique = true)
    private String categoriaDescripcion;

    @Column(name = "puntos_base", nullable = false)
    private Integer puntosBase;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_id", nullable = false)
    private Estado estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    public CategoriaReclamo() {
    }

    public CategoriaReclamo(Long categoriaReclamoId) {
        this.categoriaReclamoId = categoriaReclamoId;
    }

    public Long getCategoriaReclamoId() {
        return categoriaReclamoId;
    }

    public void setCategoriaReclamoId(Long categoriaReclamoId) {
        this.categoriaReclamoId = categoriaReclamoId;
    }

    public String getCategoriaDescripcion() {
        return categoriaDescripcion;
    }

    public void setCategoriaDescripcion(String categoriaDescripcion) {
        this.categoriaDescripcion = categoriaDescripcion;
    }

    public Integer getPuntosBase() {
        return puntosBase;
    }

    public void setPuntosBase(Integer puntosBase) {
        this.puntosBase = puntosBase;
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
