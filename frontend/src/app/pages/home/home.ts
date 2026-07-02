import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface SalonCard {
  nombre: string;
  direccion: string;
  tipo: string;
  rating: string;
  imagen: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

usuarioActual: any = null;
menuPerfilAbierto = false;

ngOnInit(): void {
  const usuarioGuardado = localStorage.getItem('usuario');

  if (usuarioGuardado) {
    this.usuarioActual = JSON.parse(usuarioGuardado);
  }
}

toggleMenuPerfil(): void {
  this.menuPerfilAbierto = !this.menuPerfilAbierto;
}

cerrarSesion(): void {
  localStorage.removeItem('usuario');
  this.usuarioActual = null;
  this.menuPerfilAbierto = false;
}

inicialUsuario(): string {
  if (!this.usuarioActual?.nombre) return 'U';
  return this.usuarioActual.nombre.charAt(0).toUpperCase();
}

nombreCompleto(): string {
  if (!this.usuarioActual) return '';

  return `${this.usuarioActual.nombre} ${this.usuarioActual.apellido || ''}`;
}

  recomendados: SalonCard[] = [
    {
      nombre: 'Lumina Hair & Atelier',
      direccion: 'Av. Larco 450, Miraflores',
      tipo: 'Peluquería · 142 reseñas',
      rating: '4,9',
      imagen: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      nombre: 'Bloom & Co. Nail Spa',
      direccion: 'Av. Camino Real 1250, San Isidro',
      tipo: 'Salón de uñas · 96 reseñas',
      rating: '4,8',
      imagen: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      nombre: 'Velluto Lash & Brow Bar',
      direccion: 'Calle Cajamarca 220, Barranco',
      tipo: 'Salón de belleza · 78 reseñas',
      rating: '4,7',
      imagen: 'https://images.pexels.com/photos/3993398/pexels-photo-3993398.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      nombre: 'Serena Wellness & Spa',
      direccion: 'Av. La Molina 3400, La Molina',
      tipo: 'Spa & Facial · 110 reseñas',
      rating: '4,9',
      imagen: 'https://images.pexels.com/photos/6621461/pexels-photo-6621461.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      nombre: 'Gilded Scissors',
      direccion: 'Av. Primavera 980, Surco',
      tipo: 'Barbería · 88 reseñas',
      rating: '4,6',
      imagen: 'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

  nuevos: SalonCard[] = [
    {
      nombre: 'Blush Studio & Make Up',
      direccion: 'Av. Santa Cruz 810, Miraflores',
      tipo: 'Maquillaje · 65 reseñas',
      rating: '4,8',
      imagen: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      nombre: 'Gilded Scissors Barbershop',
      direccion: 'Av. Primavera 980, Surco',
      tipo: 'Barbería · 88 reseñas',
      rating: '4,6',
      imagen: 'https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      nombre: 'Serena Wellness & Spa',
      direccion: 'Av. La Molina 3400, La Molina',
      tipo: 'Spa & Facial · 110 reseñas',
      rating: '4,9',
      imagen: 'https://images.pexels.com/photos/6621461/pexels-photo-6621461.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      nombre: 'Velluto Lash & Brow Bar',
      direccion: 'Calle Cajamarca 220, Barranco',
      tipo: 'Salón de belleza · 78 reseñas',
      rating: '4,7',
      imagen: 'https://images.pexels.com/photos/3993398/pexels-photo-3993398.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      nombre: 'Bloom & Co. Nail Spa',
      direccion: 'Av. Camino Real 1250',
      tipo: 'Salón de uñas',
      rating: '4,8',
      imagen: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

  slide(contenedor: HTMLElement): void {
    contenedor.scrollBy({
      left: 230,
      behavior: 'smooth'
    });
  }
}