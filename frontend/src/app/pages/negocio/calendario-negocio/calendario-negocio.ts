import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ReservaCalendario {
  dia: number;
  inicio: string;
  fin: string;
  cliente: string;
  servicio: string;
  estado: string;
}

@Component({
  selector: 'app-calendario-negocio',
  imports: [CommonModule, FormsModule],
  templateUrl: './calendario-negocio.html',
  styleUrl: './calendario-negocio.css'
})
export class CalendarioNegocio {

  reservaSeleccionada: ReservaCalendario | null = null;
  detalleX = 0;
  detalleY = 0;

  dias = ['Dom 28', 'Lun 29', 'Mar 30', 'Mié 1', 'Jue 2', 'Vie 3', 'Sáb 4'];

  horas = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00'
  ];

  reservas: ReservaCalendario[] = [
    {
      dia: 3,
      inicio: '10:00',
      fin: '10:35',
      cliente: 'Jack Doe',
      servicio: 'Secado de cabello',
      estado: 'Confirmada'
    },
    {
      dia: 3,
      inicio: '12:45',
      fin: '13:30',
      cliente: 'Ana López',
      servicio: 'Corte de pelo',
      estado: 'Confirmada'
    }
  ];

  mostrarModal = false;

  nuevaReserva: ReservaCalendario = {
    dia: 3,
    inicio: '09:00',
    fin: '09:30',
    cliente: '',
    servicio: '',
    estado: 'Manual'
  };

  horaBase = 9;
  altoHora = 48;

  abrirModal(): void {
    this.reservaSeleccionada = null;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardarReserva(): void {
    if (!this.nuevaReserva.cliente || !this.nuevaReserva.servicio) {
      return;
    }

    this.reservas.push({
      ...this.nuevaReserva,
      dia: Number(this.nuevaReserva.dia)
    });

    this.nuevaReserva = {
      dia: 3,
      inicio: '09:00',
      fin: '09:30',
      cliente: '',
      servicio: '',
      estado: 'Manual'
    };

    this.mostrarModal = false;
  }

  minutos(hora: string): number {
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m;
  }

  topReserva(reserva: ReservaCalendario): number {
    const inicio = this.minutos(reserva.inicio);
    const base = this.horaBase * 60;

    return ((inicio - base) / 60) * this.altoHora + 8;
  }

  altoReserva(reserva: ReservaCalendario): number {
    const inicio = this.minutos(reserva.inicio);
    const fin = this.minutos(reserva.fin);
    const duracion = fin - inicio;

    return Math.max((duracion / 60) * this.altoHora - 8, 42);
  }

  leftReserva(reserva: ReservaCalendario): string {
    return `calc(60px + ((100% - 60px) / 7) * ${reserva.dia} + 5px)`;
  }

  anchoReserva(): string {
    return 'calc((100% - 60px) / 7 - 10px)';
  }

  //Detalle de reserva

  abrirDetalle(reserva: ReservaCalendario, event: MouseEvent): void {
    this.reservaSeleccionada = reserva;

    const anchoCuadro = 260;
    const altoCuadro = 180;

    let x = event.clientX + 12;
    let y = event.clientY + 12;

    if (x + anchoCuadro > window.innerWidth) {
      x = event.clientX - anchoCuadro - 12;
    }

    if (y + altoCuadro > window.innerHeight) {
      y = event.clientY - altoCuadro - 12;
    }

    this.detalleX = x;
    this.detalleY = y;
  }

  cerrarDetalle(): void {
    this.reservaSeleccionada = null;
  }
}