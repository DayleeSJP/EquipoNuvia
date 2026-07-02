import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  categoriaId: number;
  tipoTratamiento: string;
  tipoPrecio: string;
  precio: number;
  duracion: string;
}

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  color: string;
  servicios: Servicio[];
}

interface Trabajador {
  nombre: string;
  apellido: string;
}

@Component({
  selector: 'app-reserva-cita',
  imports: [CommonModule],
  templateUrl: './reserva-cita.html',
  styleUrl: './reserva-cita.css'
})
export class ReservaCita implements OnInit {

  paso = 1;

  nombreNegocio = 'Nuvia Beauty';
  direccion = 'Dirección pendiente';
  distrito = 'Lima';
  portada = '';

  categorias: Categoria[] = [];
  servicios: Servicio[] = [];
  trabajadores: Trabajador[] = [];

  servicioSeleccionado: Servicio | null = null;
  trabajadorSeleccionado: Trabajador | null = null;
  sinPreferencia = false;

  fechaSeleccionada = 'Jue 2 Jul';
  horaSeleccionada = '';

  fechas = [
    { dia: 'Jue', numero: '2', mes: 'Jul' },
    { dia: 'Vie', numero: '3', mes: 'Jul' },
    { dia: 'Sáb', numero: '4', mes: 'Jul' },
    { dia: 'Dom', numero: '5', mes: 'Jul' },
    { dia: 'Lun', numero: '6', mes: 'Jul' },
    { dia: 'Mar', numero: '7', mes: 'Jul' }
  ];

  horas = ['10:00', '11:00', '11:30', '12:00', '13:00', '15:00', '16:30'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const negocioGuardado = localStorage.getItem('registroNegocioTemp');
    const personalizacionGuardada = localStorage.getItem('personalizacionNegocioTemp');
    const servicioGuardado = localStorage.getItem('servicioSeleccionadoTemp');

    if (negocioGuardado) {
      const negocio = JSON.parse(negocioGuardado);
      this.nombreNegocio = negocio.nombreNegocio || this.nombreNegocio;
      this.direccion = negocio.direccion || this.direccion;
      this.distrito = negocio.distrito || this.distrito;
    }

    if (personalizacionGuardada) {
      const personalizacion = JSON.parse(personalizacionGuardada);
      this.portada = personalizacion.portada || '';
      this.categorias = personalizacion.categorias || [];
      this.trabajadores = personalizacion.trabajadores || [];

      this.servicios = this.categorias.flatMap(categoria => categoria.servicios);
    }

    if (servicioGuardado) {
      this.servicioSeleccionado = JSON.parse(servicioGuardado);
    }
  }

  seleccionarServicio(servicio: Servicio): void {
    this.servicioSeleccionado = servicio;
  }

  seleccionarSinPreferencia(): void {
    this.sinPreferencia = true;
    this.trabajadorSeleccionado = null;
  }

  seleccionarTrabajador(trabajador: Trabajador): void {
    this.trabajadorSeleccionado = trabajador;
    this.sinPreferencia = false;
  }

  seleccionarFecha(fecha: any): void {
    this.fechaSeleccionada = `${fecha.dia} ${fecha.numero} ${fecha.mes}`;
  }

  seleccionarHora(hora: string): void {
    this.horaSeleccionada = hora;
  }

  puedeContinuar(): boolean {
    if (this.paso === 1) return !!this.servicioSeleccionado;
    if (this.paso === 2) return this.sinPreferencia || !!this.trabajadorSeleccionado;
    if (this.paso === 3) return !!this.horaSeleccionada;
    return true;
  }

  continuar(): void {
    if (!this.puedeContinuar()) return;

    if (this.paso < 4) {
      this.paso++;
      return;
    }

    this.confirmarCita();
  }

  volver(): void {
    if (this.paso > 1) {
      this.paso--;
      return;
    }

    this.router.navigate(['/catalogo/detalle']);
  }

  cerrar(): void {
    this.router.navigate(['/catalogo/detalle']);
  }

  nombreTrabajador(): string {
    if (this.sinPreferencia) return 'Sin preferencia';

    if (this.trabajadorSeleccionado) {
      return `${this.trabajadorSeleccionado.nombre} ${this.trabajadorSeleccionado.apellido}`;
    }

    return 'Pendiente';
  }

  confirmarCita(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

    const nuevaCita = {
      id: Date.now(),
      negocio: this.nombreNegocio,
      direccion: `${this.direccion}, ${this.distrito}`,
      servicio: this.servicioSeleccionado?.nombre,
      duracion: this.servicioSeleccionado?.duracion,
      precio: this.servicioSeleccionado?.precio,
      trabajador: this.nombreTrabajador(),
      fecha: this.fechaSeleccionada,
      hora: this.horaSeleccionada,
      cliente: usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Cliente',
      email: usuario?.email || 'cliente@nuvia.com',
      estado: 'Confirmada'
    };

    const citasGuardadas = localStorage.getItem('citasClienteTemp');
    const citas = citasGuardadas ? JSON.parse(citasGuardadas) : [];

    citas.push(nuevaCita);

    localStorage.setItem('citasClienteTemp', JSON.stringify(citas));

    this.router.navigate(['/cliente/mis-reservas']);
  }
}