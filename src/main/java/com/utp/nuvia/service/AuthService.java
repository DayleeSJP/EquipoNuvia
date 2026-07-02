package com.utp.nuvia.service;

import org.springframework.stereotype.Service;

import com.utp.nuvia.dto.LoginRequest;
import com.utp.nuvia.dto.LoginResponse;
import com.utp.nuvia.dto.RegistroClienteRequest;
import com.utp.nuvia.model.Rol;
import com.utp.nuvia.model.Usuario;
import com.utp.nuvia.repository.RolRepository;
import com.utp.nuvia.repository.UsuarioRepository;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;

    public AuthService(
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository
    ) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
    }

    public LoginResponse loginCliente(LoginRequest request) {

        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Correo o contraseña incorrectos"));

        if (!usuario.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Correo o contraseña incorrectos");
        }

        if (!usuario.getRol().getNombre().equalsIgnoreCase("CLIENTE")) {
            throw new RuntimeException("Este login es solo para clientes");
        }

        return new LoginResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getTelefono(),
                usuario.getEmail(),
                usuario.getRol().getNombre(),
                "Login exitoso"
        );
    }

    public LoginResponse registrarCliente(RegistroClienteRequest request) {

        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("El correo ya está registrado");
        }

        Rol rolCliente = rolRepository.findByNombre("CLIENTE")
                .orElseThrow(() -> new RuntimeException("No existe el rol CLIENTE"));

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setTelefono(request.getTelefono());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(request.getPassword());
        usuario.setRol(rolCliente);
        usuario.setFechaRegistro(LocalDateTime.now());

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        return new LoginResponse(
                usuarioGuardado.getId(),
                usuarioGuardado.getNombre(),
                usuarioGuardado.getApellido(),
                usuarioGuardado.getTelefono(),
                usuarioGuardado.getEmail(),
                usuarioGuardado.getRol().getNombre(),
                "Cliente registrado correctamente"
        );
    }
}