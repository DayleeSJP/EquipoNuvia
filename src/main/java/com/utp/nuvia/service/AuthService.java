package com.utp.nuvia.service;

import org.springframework.stereotype.Service;

import com.utp.nuvia.dto.LoginRequest;
import com.utp.nuvia.dto.LoginResponse;
import com.utp.nuvia.model.Usuario;
import com.utp.nuvia.repository.UsuarioRepository;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepository;

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
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
                usuario.getEmail(),
                usuario.getRol().getNombre(),
                "Login exitoso"
        );
    }
}