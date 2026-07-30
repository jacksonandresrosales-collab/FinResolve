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
@Table(name = "canal_reclamo")
public class CanalReclamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "canal_reclamo_id")
    private Long canalReclamoId;

    @Column(name = "canal_descripcion", nullable = false, length = 80, unique = true)
    private String canalDescripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_id", nullable = false)
    private Estado estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    public CanalReclamo() {
    }

    public CanalReclamo(Long canalReclamoId) {
        this.canalReclamoId = canalReclamoId;
    }

    public Long getCanalReclamoId() {
        return canalReclamoId;
    }

    public void setCanalReclamoId(Long canalReclamoId) {
        this.canalReclamoId = canalReclamoId;
    }

    public String getCanalDescripcion() {
        return canalDescripcion;
    }

    public void setCanalDescripcion(String canalDescripcion) {
        this.canalDescripcion = canalDescripcion;
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
