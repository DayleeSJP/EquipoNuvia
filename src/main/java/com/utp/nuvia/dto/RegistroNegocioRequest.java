package com.utp.nuvia.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistroNegocioRequest {

    private Integer usuarioId;
    private String nombreNegocio;
    private String direccion;
    private String distrito;
}