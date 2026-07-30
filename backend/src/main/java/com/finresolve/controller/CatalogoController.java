package com.finresolve.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finresolve.dto.CatalogoResponse;
import com.finresolve.dto.ClienteResponse;
import com.finresolve.service.CatalogoService;

@RestController
@RequestMapping("/catalogos")
public class CatalogoController {

    private final CatalogoService catalogoService;

    @Autowired
    public CatalogoController(CatalogoService catalogoService) {
        this.catalogoService = catalogoService;
    }

    @GetMapping("/canales")
    public List<CatalogoResponse> listarCanales() {
        return catalogoService.listarCanales();
    }

    @GetMapping("/categorias")
    public List<CatalogoResponse> listarCategorias() {
        return catalogoService.listarCategorias();
    }

    @GetMapping("/prioridades")
    public List<CatalogoResponse> listarPrioridades() {
        return catalogoService.listarPrioridades();
    }

    @GetMapping("/estados-reclamo")
    public List<CatalogoResponse> listarEstadosReclamo() {
        return catalogoService.listarEstadosReclamo();
    }

    @GetMapping("/analistas")
    public List<CatalogoResponse> listarAnalistas() {
        return catalogoService.listarAnalistas();
    }

    @GetMapping("/clientes")
    public List<ClienteResponse> listarClientes() {
        return catalogoService.listarClientes();
    }

    @GetMapping("/condiciones")
    public List<CatalogoResponse> listarCondiciones() {
        return catalogoService.listarCondiciones();
    }

    @GetMapping("/tipo-persona")
    public List<CatalogoResponse> listarTipoPersona() {
        return catalogoService.listarTipoPersona();
    }

    @GetMapping("/roles")
    public List<CatalogoResponse> listarRoles() {
        return catalogoService.listarRoles();
    }
}
