package com.utp.nuvia.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CatalogoPeluqueriaResponse {

    private Integer id;
    private String nombre;
    private String direccion;
    private String tipo;
    private String rating;
    private String imagen;
}
