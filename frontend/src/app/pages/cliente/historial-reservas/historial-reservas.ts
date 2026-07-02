import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-historial-reservas',
  imports: [CommonModule, RouterLink],
  templateUrl: './historial-reservas.html',
  styleUrl: './historial-reservas.css'
})
export class HistorialReservas implements OnInit {

  citas: any[] = [];
  nombreCliente = 'Cliente';

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    const citasGuardadas = localStorage.getItem('citasClienteTemp');

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.nombreCliente = usuario.nombre || 'Cliente';
    }

    this.citas = citasGuardadas ? JSON.parse(citasGuardadas) : [];
  }

  cancelarCita(id: number): void {
    const cita = this.citas.find(c => c.id === id);
    
    if (cita && cita.estado !== 'Cancelada') {
      if (confirm(`¿Cancelar la cita de ${cita.servicio}?`)) {
        this.citas = this.citas.map(cita => {
          if (cita.id === id) {
            return { ...cita, estado: 'Cancelada' };
          }
          return cita;
        });
        
        localStorage.setItem('citasClienteTemp', JSON.stringify(this.citas));
      }
    }
  }
}