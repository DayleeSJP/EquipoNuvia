package com.utp.nuvia.repository;

import com.utp.nuvia.model.Trabajador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrabajadorRepository extends JpaRepository<Trabajador, Integer> {

    List<Trabajador> findByPeluqueriaId(Integer peluqueriaId);

    void deleteByPeluqueriaId(Integer peluqueriaId);
}