package com.finresolve.model;

import java.math.BigDecimal;
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
@Table(name = "reclamo")
public class Reclamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reclamo_id")
    private Long reclamoId;

    @Column(name = "codigo", nullable = false, length = 30, unique = true)
    private String codigo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_persona_id", nullable = false)
    private Persona cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "canal_reclamo_id", nullable = false)
    private CanalReclamo canalReclamo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_reclamo_id", nullable = false)
    private CategoriaReclamo categoriaReclamo;

    @Column(name = "descripcion", nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "monto_reclamo", precision = 10, scale = 2)
    private BigDecimal montoReclamo;

    @Column(name = "indisponibilidad_digital", nullable = false)
    private Boolean indisponibilidadDigital;

    @Column(name = "puntaje", nullable = false)
    private Integer puntaje;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prioridad_id", nullable = false)
    private Prioridad prioridad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sla_id", nullable = false)
    private Sla sla;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_reclamo_id", nullable = false)
    private EstadoReclamo estadoReclamo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "analista_usuario_id")
    private Usuario analista;

    @Column(name = "fecha_reclamo", nullable = false)
    private LocalDateTime fechaReclamo;

    @Column(name = "fecha_limite", nullable = false)
    private LocalDateTime fechaLimite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_id", nullable = false)
    private Estado estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usu_id_creacion", nullable = false)
    private Usuario usuarioCreacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usu_id_modificacion")
    private Usuario usuarioModificacion;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_modificacion")
    private LocalDateTime fechaModificacion;

    public Reclamo() {
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

    public Persona getCliente() {
        return cliente;
    }

    public void setCliente(Persona cliente) {
        this.cliente = cliente;
    }

    public CanalReclamo getCanalReclamo() {
        return canalReclamo;
    }

    public void setCanalReclamo(CanalReclamo canalReclamo) {
        this.canalReclamo = canalReclamo;
    }

    public CategoriaReclamo getCategoriaReclamo() {
        return categoriaReclamo;
    }

    public void setCategoriaReclamo(CategoriaReclamo categoriaReclamo) {
        this.categoriaReclamo = categoriaReclamo;
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

    public Prioridad getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(Prioridad prioridad) {
        this.prioridad = prioridad;
    }

    public Sla getSla() {
        return sla;
    }

    public void setSla(Sla sla) {
        this.sla = sla;
    }

    public EstadoReclamo getEstadoReclamo() {
        return estadoReclamo;
    }

    public void setEstadoReclamo(EstadoReclamo estadoReclamo) {
        this.estadoReclamo = estadoReclamo;
    }

    public Usuario getAnalista() {
        return analista;
    }

    public void setAnalista(Usuario analista) {
        this.analista = analista;
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

    public Usuario getUsuarioCreacion() {
        return usuarioCreacion;
    }

    public void setUsuarioCreacion(Usuario usuarioCreacion) {
        this.usuarioCreacion = usuarioCreacion;
    }

    public Usuario getUsuarioModificacion() {
        return usuarioModificacion;
    }

    public void setUsuarioModificacion(Usuario usuarioModificacion) {
        this.usuarioModificacion = usuarioModificacion;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateTime getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(LocalDateTime fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }
}
