import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro-negocio',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro-negocio.html',
  styleUrl: './registro-negocio.css'
})
export class RegistroNegocio {

  paso = 1;
  estaLogueado = false;

  nombre = '';
  apellido = '';
  telefono = '';
  email = '';
  password = '';

  nombreNegocio = '';
  direccion = '';
  distrito = '';

  error = '';

  constructor(private router: Router) {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);

      this.estaLogueado = true;
      this.nombre = usuario.nombre || '';
      this.apellido = usuario.apellido || '';
      this.email = usuario.email || '';
      this.telefono = usuario.telefono || '';
    }
  }

  continuarCuenta(): void {
    this.error = '';

    if (!this.nombre || !this.apellido || !this.telefono) {
      this.error = 'Completa tu nombre, apellido y teléfono.';
      return;
    }

    if (!this.estaLogueado && (!this.email || !this.password)) {
      this.error = 'Completa tu correo y contraseña.';
      return;
    }

    this.paso = 2;
  }

  continuarNegocio(): void {
    this.error = '';

    if (!this.nombreNegocio) {
      this.error = 'Ingresa el nombre de tu negocio.';
      return;
    }

    this.paso = 3;
  }

  finalizarRegistro(): void {
    this.error = '';

    if (!this.direccion || !this.distrito) {
      this.error = 'Completa la dirección y distrito del establecimiento.';
      return;
    }

    const registroNegocio = {
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      email: this.email,
      nombreNegocio: this.nombreNegocio,
      direccion: this.direccion,
      distrito: this.distrito
    };

    localStorage.setItem('registroNegocioTemp', JSON.stringify(registroNegocio));

    this.router.navigate(['/negocio/dashboard']);

  }

  volver(): void {
    if (this.paso > 1) {
      this.paso--;
    }
  }
}