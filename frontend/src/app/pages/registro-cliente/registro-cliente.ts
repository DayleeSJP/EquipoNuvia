import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-registro-cliente',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro-cliente.html',
  styleUrl: './registro-cliente.css'
})
export class RegistroCliente {

  nombre = '';
  apellido = '';
  telefono = '';
  email = '';
  password = '';

  error = '';
  mensaje = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrar(): void {
    this.error = '';
    this.mensaje = '';

    this.authService.registrarCliente({
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.mensaje = 'Cuenta creada correctamente';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error) => {
        this.error = error.error?.mensaje || 'No se pudo registrar el cliente';
      }
    });
  }
}