package com.utp.nuvia.repository;

import com.utp.nuvia.model.Peluqueria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PeluqueriaRepository extends JpaRepository<Peluqueria, Integer> {

    Optional<Peluqueria> findByPropietarioId(Integer usuarioId);

    List<Peluqueria> findByActivaTrue();
}