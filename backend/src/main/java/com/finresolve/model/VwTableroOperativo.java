package com.finresolve.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.Immutable;

@Entity
@Table(name = "vw_tablero_operativo")
@Immutable
public class VwTableroOperativo {

    @Id
    @Column(name = "total_reclamos")
    private Long totalReclamos;

    @Column(name = "abiertos")
    private Long abiertos;

    @Column(name = "resueltos")
    private Long resueltos;

    @Column(name = "vencidos")
    private Long vencidos;

    @Column(name = "proximos_a_vencer")
    private Long proximosAVencer;

    @Column(name = "criticos")
    private Long criticos;

    public VwTableroOperativo() {
    }

    public Long getTotalReclamos() {
        return totalReclamos;
    }

    public void setTotalReclamos(Long totalReclamos) {
        this.totalReclamos = totalReclamos;
    }

    public Long getAbiertos() {
        return abiertos;
    }

    public void setAbiertos(Long abiertos) {
        this.abiertos = abiertos;
    }

    public Long getResueltos() {
        return resueltos;
    }

    public void setResueltos(Long resueltos) {
        this.resueltos = resueltos;
    }

    public Long getVencidos() {
        return vencidos;
    }

    public void setVencidos(Long vencidos) {
        this.vencidos = vencidos;
    }

    public Long getProximosAVencer() {
        return proximosAVencer;
    }

    public void setProximosAVencer(Long proximosAVencer) {
        this.proximosAVencer = proximosAVencer;
    }

    public Long getCriticos() {
        return criticos;
    }

    public void setCriticos(Long criticos) {
        this.criticos = criticos;
    }
}
