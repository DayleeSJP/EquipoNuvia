package com.utp.nuvia.controller;

import com.utp.nuvia.dto.PersonalizacionNegocioRequest;
import com.utp.nuvia.dto.RegistroNegocioRequest;
import com.utp.nuvia.service.NegocioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/negocio")
public class NegocioController {

    private final NegocioService negocioService;

    public NegocioController(NegocioService negocioService) {
        this.negocioService = negocioService;
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrarNegocio(@RequestBody RegistroNegocioRequest request) {
        try {
            return ResponseEntity.ok(negocioService.registrarNegocio(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("mensaje", e.getMessage()));
        }
    }

    @PostMapping("/personalizacion")
    public ResponseEntity<?> guardarPersonalizacion(@RequestBody PersonalizacionNegocioRequest request) {
        try {
            return ResponseEntity.ok(negocioService.guardarPersonalizacion(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("mensaje", e.getMessage()));
        }
    }
}