package com.finresolve.dto;

import java.util.List;

public class TableroResponse {

    private Long totalReclamos;
    private Long pendientes;
    private Long enAnalisis;
    private Long resueltos;
    private Long rechazados;
    private Long criticos;
    private Long altos;
    private Long medios;
    private Long bajos;
    private Long vencidos;
    private List<ReclamoResponse> ultimosReclamos;

    public TableroResponse() {
    }

    public TableroResponse(Long totalReclamos, Long pendientes, Long enAnalisis,
                           Long resueltos, Long rechazados, Long criticos, Long altos,
                           Long medios, Long bajos, Long vencidos,
                           List<ReclamoResponse> ultimosReclamos) {
        this.totalReclamos = totalReclamos;
        this.pendientes = pendientes;
        this.enAnalisis = enAnalisis;
        this.resueltos = resueltos;
        this.rechazados = rechazados;
        this.criticos = criticos;
        this.altos = altos;
        this.medios = medios;
        this.bajos = bajos;
        this.vencidos = vencidos;
        this.ultimosReclamos = ultimosReclamos;
    }

    public Long getTotalReclamos() {
        return totalReclamos;
    }

    public void setTotalReclamos(Long totalReclamos) {
        this.totalReclamos = totalReclamos;
    }

    public Long getPendientes() {
        return pendientes;
    }

    public void setPendientes(Long pendientes) {
        this.pendientes = pendientes;
    }

    public Long getEnAnalisis() {
        return enAnalisis;
    }

    public void setEnAnalisis(Long enAnalisis) {
        this.enAnalisis = enAnalisis;
    }

    public Long getResueltos() {
        return resueltos;
    }

    public void setResueltos(Long resueltos) {
        this.resueltos = resueltos;
    }

    public Long getRechazados() {
        return rechazados;
    }

    public void setRechazados(Long rechazados) {
        this.rechazados = rechazados;
    }

    public Long getCriticos() {
        return criticos;
    }

    public void setCriticos(Long criticos) {
        this.criticos = criticos;
    }

    public Long getAltos() {
        return altos;
    }

    public void setAltos(Long altos) {
        this.altos = altos;
    }

    public Long getMedios() {
        return medios;
    }

    public void setMedios(Long medios) {
        this.medios = medios;
    }

    public Long getBajos() {
        return bajos;
    }

    public void setBajos(Long bajos) {
        this.bajos = bajos;
    }

    public Long getVencidos() {
        return vencidos;
    }

    public void setVencidos(Long vencidos) {
        this.vencidos = vencidos;
    }

    public List<ReclamoResponse> getUltimosReclamos() {
        return ultimosReclamos;
    }

    public void setUltimosReclamos(List<ReclamoResponse> ultimosReclamos) {
        this.ultimosReclamos = ultimosReclamos;
    }
}
