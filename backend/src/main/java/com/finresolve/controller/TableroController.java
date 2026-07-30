package com.finresolve.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finresolve.dto.TableroResponse;
import com.finresolve.model.VwReclamosResumen;
import com.finresolve.model.VwTableroOperativo;
import com.finresolve.service.TableroService;

@RestController
@RequestMapping("/tablero")
public class TableroController {

    private final TableroService tableroService;

    @Autowired
    public TableroController(TableroService tableroService) {
        this.tableroService = tableroService;
    }

    @GetMapping
    public TableroResponse obtenerTablero() {
        return tableroService.obtenerTablero();
    }

    @GetMapping("/vista-operativa")
    public List<VwTableroOperativo> obtenerTableroVista() {
        return tableroService.obtenerTableroVista();
    }

    @GetMapping("/reclamos-resumen")
    public List<VwReclamosResumen> obtenerReclamosResumen() {
        return tableroService.obtenerReclamosResumen();
    }
}
