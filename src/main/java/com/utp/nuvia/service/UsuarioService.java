package com.utp.nuvia.service;

import org.springframework.stereotype.Service;
import com.utp.nuvia.model.Usuario;
import com.utp.nuvia.repository.UsuarioRepository;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }
}