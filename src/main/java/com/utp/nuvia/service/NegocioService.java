package com.utp.nuvia.service;

import com.utp.nuvia.dto.CatalogoPeluqueriaResponse;
import com.utp.nuvia.dto.DetallePeluqueriaResponse;
import com.utp.nuvia.dto.PersonalizacionNegocioRequest;
import com.utp.nuvia.model.Categoria;
import com.utp.nuvia.model.Peluqueria;
import com.utp.nuvia.model.Servicio;
import com.utp.nuvia.model.Trabajador;
import com.utp.nuvia.model.Usuario;
import com.utp.nuvia.repository.PeluqueriaRepository;
import com.utp.nuvia.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class NegocioService {

    private final PeluqueriaRepository peluqueriaRepository;
    private final UsuarioRepository usuarioRepository;

    public NegocioService(
            PeluqueriaRepository peluqueriaRepository,
            UsuarioRepository usuarioRepository
    ) {
        this.peluqueriaRepository = peluqueriaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public DetallePeluqueriaResponse guardarPersonalizacion(PersonalizacionNegocioRequest request) {

        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Peluqueria peluqueria = peluqueriaRepository.findByPropietarioId(request.getUsuarioId())
                .orElseGet(Peluqueria::new);

        peluqueria.setPropietario(usuario);
        peluqueria.setNombre(request.getNombreNegocio());
        peluqueria.setDireccion(request.getDireccion());
        peluqueria.setDistrito(request.getDistrito());
        peluqueria.setPortadaImagen(request.getPortadaImagen());
        peluqueria.setSobreNosotros(request.getSobreNosotros());
        peluqueria.setActiva(true);

        if (peluqueria.getFechaRegistro() == null) {
            peluqueria.setFechaRegistro(LocalDateTime.now());
        }

        peluqueria.getCategorias().clear();
        peluqueria.getTrabajadores().clear();

        if (request.getCategorias() != null) {
            for (PersonalizacionNegocioRequest.CategoriaRequest categoriaRequest : request.getCategorias()) {
                Categoria categoria = new Categoria();
                categoria.setNombre(categoriaRequest.getNombre());
                categoria.setDescripcion(categoriaRequest.getDescripcion());
                categoria.setColor(categoriaRequest.getColor());
                categoria.setPeluqueria(peluqueria);

                if (categoriaRequest.getServicios() != null) {
                    for (PersonalizacionNegocioRequest.ServicioRequest servicioRequest : categoriaRequest.getServicios()) {
                        Servicio servicio = new Servicio();
                        servicio.setNombre(servicioRequest.getNombre());
                        servicio.setDescripcion(servicioRequest.getDescripcion());
                        servicio.setTipoTratamiento(servicioRequest.getTipoTratamiento());
                        servicio.setTipoPrecio(servicioRequest.getTipoPrecio());
                        servicio.setPrecio(servicioRequest.getPrecio());
                        servicio.setDuracion(servicioRequest.getDuracion());
                        servicio.setCategoria(categoria);

                        categoria.getServicios().add(servicio);
                    }
                }

                peluqueria.getCategorias().add(categoria);
            }
        }

        if (request.getTrabajadores() != null) {
            for (PersonalizacionNegocioRequest.TrabajadorRequest trabajadorRequest : request.getTrabajadores()) {
                Trabajador trabajador = new Trabajador();
                trabajador.setNombre(trabajadorRequest.getNombre());
                trabajador.setApellido(trabajadorRequest.getApellido());
                trabajador.setActivo(true);
                trabajador.setPeluqueria(peluqueria);

                peluqueria.getTrabajadores().add(trabajador);
            }
        }

        Peluqueria guardada = peluqueriaRepository.save(peluqueria);

        return convertirDetalle(guardada);
    }

    public List<CatalogoPeluqueriaResponse> listarCatalogo() {
        List<Peluqueria> peluquerias = peluqueriaRepository.findByActivaTrue();
        List<CatalogoPeluqueriaResponse> respuesta = new ArrayList<>();

        for (Peluqueria peluqueria : peluquerias) {
            int totalServicios = peluqueria.getCategorias()
                    .stream()
                    .mapToInt(categoria -> categoria.getServicios().size())
                    .sum();

            respuesta.add(new CatalogoPeluqueriaResponse(
                    peluqueria.getId(),
                    peluqueria.getNombre(),
                    peluqueria.getDireccion() + ", " + peluqueria.getDistrito(),
                    "Peluquería · " + totalServicios + " servicios",
                    "4,8",
                    peluqueria.getPortadaImagen()
            ));
        }

        return respuesta;
    }

    public DetallePeluqueriaResponse obtenerDetalle(Integer id) {
        Peluqueria peluqueria = peluqueriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Peluquería no encontrada"));

        return convertirDetalle(peluqueria);
    }

    private DetallePeluqueriaResponse convertirDetalle(Peluqueria peluqueria) {
        DetallePeluqueriaResponse response = new DetallePeluqueriaResponse();

        response.setId(peluqueria.getId());
        response.setNombreNegocio(peluqueria.getNombre());
        response.setDireccion(peluqueria.getDireccion());
        response.setDistrito(peluqueria.getDistrito());
        response.setPortada(peluqueria.getPortadaImagen());
        response.setSobreNosotros(peluqueria.getSobreNosotros());

        List<DetallePeluqueriaResponse.CategoriaDetalle> categorias = new ArrayList<>();

        for (Categoria categoria : peluqueria.getCategorias()) {
            DetallePeluqueriaResponse.CategoriaDetalle categoriaDetalle =
                    new DetallePeluqueriaResponse.CategoriaDetalle();

            categoriaDetalle.setId(categoria.getId());
            categoriaDetalle.setNombre(categoria.getNombre());
            categoriaDetalle.setDescripcion(categoria.getDescripcion());
            categoriaDetalle.setColor(categoria.getColor());

            List<DetallePeluqueriaResponse.ServicioDetalle> servicios = new ArrayList<>();

            for (Servicio servicio : categoria.getServicios()) {
                DetallePeluqueriaResponse.ServicioDetalle servicioDetalle =
                        new DetallePeluqueriaResponse.ServicioDetalle();

                servicioDetalle.setId(servicio.getId());
                servicioDetalle.setNombre(servicio.getNombre());
                servicioDetalle.setDescripcion(servicio.getDescripcion());
                servicioDetalle.setCategoriaId(categoria.getId());
                servicioDetalle.setTipoTratamiento(servicio.getTipoTratamiento());
                servicioDetalle.setTipoPrecio(servicio.getTipoPrecio());
                servicioDetalle.setPrecio(servicio.getPrecio());
                servicioDetalle.setDuracion(servicio.getDuracion());

                servicios.add(servicioDetalle);
            }

            categoriaDetalle.setServicios(servicios);
            categorias.add(categoriaDetalle);
        }

        List<DetallePeluqueriaResponse.TrabajadorDetalle> trabajadores = new ArrayList<>();

        for (Trabajador trabajador : peluqueria.getTrabajadores()) {
            DetallePeluqueriaResponse.TrabajadorDetalle trabajadorDetalle =
                    new DetallePeluqueriaResponse.TrabajadorDetalle();

            trabajadorDetalle.setId(trabajador.getId());
            trabajadorDetalle.setNombre(trabajador.getNombre());
            trabajadorDetalle.setApellido(trabajador.getApellido());

            trabajadores.add(trabajadorDetalle);
        }

        response.setCategorias(categorias);
        response.setTrabajadores(trabajadores);

        return response;
    }
}