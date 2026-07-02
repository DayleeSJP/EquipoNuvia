package com.utp.nuvia.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "peluquerias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Peluqueria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false, length = 255)
    private String direccion;

    @Column(nullable = false, length = 100)
    private String distrito;

    @Column(length = 20)
    private String telefono;

    @Column(name = "imagen_logo", columnDefinition = "LONGTEXT")
    private String imagenLogo;

    @Column(nullable = false, length = 30)
    private String estado;

    @Column(nullable = false)
    private Boolean activa = true;

    @Column(name = "fecha_registro", nullable = false)
    private LocalDateTime fechaRegistro;
}