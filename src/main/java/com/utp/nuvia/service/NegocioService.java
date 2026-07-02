package com.utp.nuvia.service;

import com.utp.nuvia.dto.CatalogoPeluqueriaResponse;
import com.utp.nuvia.dto.DetallePeluqueriaResponse;
import com.utp.nuvia.dto.PersonalizacionNegocioRequest;
import com.utp.nuvia.dto.RegistroNegocioRequest;
import com.utp.nuvia.model.*;
import com.utp.nuvia.repository.*;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class NegocioService {

    private final UsuarioRepository usuarioRepository;
    private final PeluqueriaRepository peluqueriaRepository;
    private final CategoriaRepository categoriaRepository;
    private final ServicioRepository servicioRepository;
    private final TrabajadorRepository trabajadorRepository;

    public NegocioService(
            UsuarioRepository usuarioRepository,
            PeluqueriaRepository peluqueriaRepository,
            CategoriaRepository categoriaRepository,
            ServicioRepository servicioRepository,
            TrabajadorRepository trabajadorRepository) {
        this.usuarioRepository = usuarioRepository;
        this.peluqueriaRepository = peluqueriaRepository;
        this.categoriaRepository = categoriaRepository;
        this.servicioRepository = servicioRepository;
        this.trabajadorRepository = trabajadorRepository;
    }

    @Transactional
    public DetallePeluqueriaResponse registrarNegocio(RegistroNegocioRequest request) {

        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Peluqueria peluqueria = peluqueriaRepository.findByUsuarioId(request.getUsuarioId())
                .orElseGet(Peluqueria::new);

        peluqueria.setUsuario(usuario);
        peluqueria.setNombre(request.getNombreNegocio());
        peluqueria.setDireccion(request.getDireccion());
        peluqueria.setDistrito(request.getDistrito());
        peluqueria.setEstado("ACTIVO");

        if (peluqueria.getDescripcion() == null) {
            peluqueria.setDescripcion("");
        }

        if (peluqueria.getImagenLogo() == null) {
            peluqueria.setImagenLogo("");
        }

        if (peluqueria.getFechaRegistro() == null) {
            peluqueria.setFechaRegistro(LocalDateTime.now());
        }

        Peluqueria guardada = peluqueriaRepository.save(peluqueria);

        return obtenerDetalle(guardada.getId());
    }

    @Transactional
    public DetallePeluqueriaResponse guardarPersonalizacion(PersonalizacionNegocioRequest request) {

        Peluqueria peluqueria = peluqueriaRepository.findByUsuarioId(request.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Primero debes registrar el negocio"));

        peluqueria.setImagenLogo(request.getPortadaImagen());
        peluqueria.setDescripcion(request.getSobreNosotros());
        peluqueriaRepository.save(peluqueria);

        servicioRepository.deleteByPeluqueriaId(peluqueria.getId());
        trabajadorRepository.deleteByPeluqueriaId(peluqueria.getId());

        if (request.getCategorias() != null) {
            for (PersonalizacionNegocioRequest.CategoriaRequest categoriaRequest : request.getCategorias()) {

                Categoria categoria = categoriaRepository.findByNombre(categoriaRequest.getNombre())
                        .orElseGet(() -> {
                            Categoria nueva = new Categoria();
                            nueva.setNombre(categoriaRequest.getNombre());
                            return categoriaRepository.save(nueva);
                        });

                if (categoriaRequest.getServicios() != null) {
                    for (PersonalizacionNegocioRequest.ServicioRequest servicioRequest : categoriaRequest
                            .getServicios()) {
                        Servicio servicio = new Servicio();
                        servicio.setPeluqueria(peluqueria);
                        servicio.setCategoria(categoria);
                        servicio.setNombre(servicioRequest.getNombre());
                        servicio.setDescripcion(servicioRequest.getDescripcion());
                        servicio.setPrecio(servicioRequest.getPrecio());
                        servicio.setDuracionMin(convertirDuracionAMinutos(servicioRequest.getDuracion()));

                        servicioRepository.save(servicio);
                    }
                }
            }
        }

        if (request.getTrabajadores() != null) {
            for (PersonalizacionNegocioRequest.TrabajadorRequest trabajadorRequest : request.getTrabajadores()) {
                Trabajador trabajador = new Trabajador();
                trabajador.setPeluqueria(peluqueria);
                trabajador.setNombre(trabajadorRequest.getNombre());
                trabajador.setApellido(trabajadorRequest.getApellido());
                trabajador.setEstado("ACTIVO");

                trabajadorRepository.save(trabajador);
            }
        }

        return obtenerDetalle(peluqueria.getId());
    }

    public List<CatalogoPeluqueriaResponse> listarCatalogo() {
        List<Peluqueria> peluquerias = peluqueriaRepository.findByEstado("ACTIVO");
        List<CatalogoPeluqueriaResponse> response = new ArrayList<>();

        for (Peluqueria peluqueria : peluquerias) {
            List<Servicio> servicios = servicioRepository.findByPeluqueriaId(peluqueria.getId());

            List<String> nombresServicios = servicios
                    .stream()
                    .map(servicio -> servicio.getNombre().toLowerCase())
                    .toList();

            response.add(new CatalogoPeluqueriaResponse(
                    peluqueria.getId(),
                    peluqueria.getNombre(),
                    peluqueria.getDireccion() + ", " + peluqueria.getDistrito(),
                    peluqueria.getDistrito(),
                    "Peluquería · " + servicios.size() + " servicios",
                    "4,8",
                    peluqueria.getImagenLogo(),
                    nombresServicios));
        }

        return response;
    }

    public DetallePeluqueriaResponse obtenerDetalle(Integer id) {
        Peluqueria peluqueria = peluqueriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Peluquería no encontrada"));

        DetallePeluqueriaResponse response = new DetallePeluqueriaResponse();

        response.setId(peluqueria.getId());
        response.setNombreNegocio(peluqueria.getNombre());
        response.setDireccion(peluqueria.getDireccion());
        response.setDistrito(peluqueria.getDistrito());
        response.setPortada(peluqueria.getImagenLogo());
        response.setSobreNosotros(peluqueria.getDescripcion());

        List<Servicio> servicios = servicioRepository.findByPeluqueriaId(peluqueria.getId());
        List<Categoria> categorias = categoriaRepository.findAll();

        List<DetallePeluqueriaResponse.CategoriaDetalle> categoriasDetalle = new ArrayList<>();

        for (Categoria categoria : categorias) {
            List<DetallePeluqueriaResponse.ServicioDetalle> serviciosCategoria = new ArrayList<>();

            for (Servicio servicio : servicios) {
                if (servicio.getCategoria().getId().equals(categoria.getId())) {
                    DetallePeluqueriaResponse.ServicioDetalle servicioDetalle = new DetallePeluqueriaResponse.ServicioDetalle();

                    servicioDetalle.setId(servicio.getId());
                    servicioDetalle.setNombre(servicio.getNombre());
                    servicioDetalle.setDescripcion(servicio.getDescripcion());
                    servicioDetalle.setCategoriaId(categoria.getId());
                    servicioDetalle.setPrecio(servicio.getPrecio());
                    servicioDetalle.setDuracion(servicio.getDuracionMin() + " min");

                    serviciosCategoria.add(servicioDetalle);
                }
            }

            if (!serviciosCategoria.isEmpty()) {
                DetallePeluqueriaResponse.CategoriaDetalle categoriaDetalle = new DetallePeluqueriaResponse.CategoriaDetalle();

                categoriaDetalle.setId(categoria.getId());
                categoriaDetalle.setNombre(categoria.getNombre());
                categoriaDetalle.setServicios(serviciosCategoria);

                categoriasDetalle.add(categoriaDetalle);
            }
        }

        List<Trabajador> trabajadores = trabajadorRepository.findByPeluqueriaId(peluqueria.getId());
        List<DetallePeluqueriaResponse.TrabajadorDetalle> trabajadoresDetalle = new ArrayList<>();

        for (Trabajador trabajador : trabajadores) {
            DetallePeluqueriaResponse.TrabajadorDetalle trabajadorDetalle = new DetallePeluqueriaResponse.TrabajadorDetalle();

            trabajadorDetalle.setId(trabajador.getId());
            trabajadorDetalle.setNombre(trabajador.getNombre());
            trabajadorDetalle.setApellido(trabajador.getApellido());

            trabajadoresDetalle.add(trabajadorDetalle);
        }

        response.setCategorias(categoriasDetalle);
        response.setTrabajadores(trabajadoresDetalle);

        return response;
    }

    private Integer convertirDuracionAMinutos(String duracion) {
        if (duracion == null || duracion.isBlank())
            return 45;

        if (duracion.contains("2 h"))
            return 120;
        if (duracion.contains("1 h y 30"))
            return 90;
        if (duracion.contains("1 h y 15"))
            return 75;
        if (duracion.contains("1 h"))
            return 60;
        if (duracion.contains("45"))
            return 45;
        if (duracion.contains("35"))
            return 35;
        if (duracion.contains("30"))
            return 30;

        return 45;
    }
}