package com.utp.nuvia.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
    private Integer id;
    private String nombre;
    private String apellido;
    private String email;
    private String rol;
    private String mensaje;
}
