package com.finresolve.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finresolve.dto.AsignacionRequest;
import com.finresolve.dto.CambioEstadoRequest;
import com.finresolve.dto.ReclamoDetalleResponse;
import com.finresolve.dto.ReclamoRequest;
import com.finresolve.dto.ReclamoResponse;
import com.finresolve.service.ReclamoService;

@RestController
@RequestMapping("/reclamos")
public class ReclamoController {

    private final ReclamoService reclamoService;

    @Autowired
    public ReclamoController(ReclamoService reclamoService) {
        this.reclamoService = reclamoService;
    }

    @GetMapping
    public List<ReclamoResponse> listarTodos() {
        return reclamoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ReclamoDetalleResponse obtenerPorId(@PathVariable Long id) {
        return reclamoService.obtenerPorId(id);
    }

    @PostMapping
    public ResponseEntity<ReclamoResponse> crear(@RequestBody ReclamoRequest request) {
        ReclamoResponse response = reclamoService.crear(request);
        return ResponseEntity.status(201).body(response);
    }

    @PutMapping("/{id}/asignar")
    public ReclamoResponse asignar(@PathVariable Long id, @RequestBody AsignacionRequest request) {
        return reclamoService.asignar(id, request);
    }

    @PutMapping("/{id}/estado")
    public ReclamoResponse cambiarEstado(@PathVariable Long id, @RequestBody CambioEstadoRequest request) {
        return reclamoService.cambiarEstado(id, request);
    }

    @GetMapping("/estado/{estadoReclamoId}")
    public List<ReclamoResponse> listarPorEstado(@PathVariable Long estadoReclamoId) {
        return reclamoService.listarPorEstado(estadoReclamoId);
    }

    @GetMapping("/analista/{usuarioId}")
    public List<ReclamoResponse> listarPorAnalista(@PathVariable Long usuarioId) {
        return reclamoService.listarPorAnalista(usuarioId);
    }
}
