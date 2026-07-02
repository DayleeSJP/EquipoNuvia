package com.utp.nuvia.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private Usuario propietario;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(nullable = false, length = 200)
    private String direccion;

    @Column(nullable = false, length = 80)
    private String distrito;

    @Column(name = "portada_imagen", columnDefinition = "LONGTEXT")
    private String portadaImagen;

    @Column(name = "sobre_nosotros", columnDefinition = "TEXT")
    private String sobreNosotros;

    @Column(nullable = false)
    private Boolean activa = true;

    @Column(name = "fecha_registro", nullable = false)
    private LocalDateTime fechaRegistro;

    @OneToMany(mappedBy = "peluqueria", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Categoria> categorias = new ArrayList<>();

    @OneToMany(mappedBy = "peluqueria", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Trabajador> trabajadores = new ArrayList<>();
}