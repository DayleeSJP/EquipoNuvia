import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';
  error: string = '';
  mensaje: string = '';

  constructor(private authService: AuthService) {}

  login(): void {
    this.error = '';
    this.mensaje = '';

    this.authService.loginCliente({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.authService.guardarSesion(response);
        this.mensaje = `Bienvenida, ${response.nombre}`;
      },
      error: (error) => {
        this.error = error.error?.mensaje || 'Correo o contraseña incorrectos';
      }
    });
  }
}