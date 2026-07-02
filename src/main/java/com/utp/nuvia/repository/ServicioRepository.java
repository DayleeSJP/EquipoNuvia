package com.utp.nuvia.repository;

import com.utp.nuvia.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServicioRepository extends JpaRepository<Servicio, Integer> {

    List<Servicio> findByPeluqueriaId(Integer peluqueriaId);

    void deleteByPeluqueriaId(Integer peluqueriaId);
}