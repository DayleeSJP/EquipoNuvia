package com.utp.nuvia.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class PersonalizacionNegocioRequest {

    private Integer usuarioId;
    private String portadaImagen;
    private String sobreNosotros;
    private List<CategoriaRequest> categorias;
    private List<TrabajadorRequest> trabajadores;

    @Getter
    @Setter
    public static class CategoriaRequest {
        private String nombre;
        private String descripcion;
        private String color;
        private List<ServicioRequest> servicios;
    }

    @Getter
    @Setter
    public static class ServicioRequest {
        private String nombre;
        private String descripcion;
        private String tipoTratamiento;
        private String tipoPrecio;
        private BigDecimal precio;
        private String duracion;
    }

    @Getter
    @Setter
    public static class TrabajadorRequest {
        private String nombre;
        private String apellido;
    }
}