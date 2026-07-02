import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CatalogoService, SalonCard } from '../../services/catalogo';
import { FormsModule } from '@angular/forms';

/*
interface SalonCard {
  nombre: string;
  direccion: string;
  tipo: string;
  rating: string;
  imagen: string;
}
*/
@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  usuarioActual: any = null;
  menuPerfilAbierto = false;
  catalogoCompleto: SalonCard[] = [];

  ubicacionSeleccionada = '';
  servicioSeleccionado = '';
  fechaSeleccionada = '';

  busquedaRealizada = false;
  sinResultados = false;

  constructor(
    private catalogoService: CatalogoService,
    private router: Router
  ) { }

  verDetalle(card: SalonCard): void {
    if (card.id) {
      this.router.navigate(['/catalogo/detalle', card.id]);
      return;
    }

    localStorage.setItem('salonSeleccionadoTemp', JSON.stringify(card));
    this.router.navigate(['/catalogo/detalle']);
  }

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      this.usuarioActual = JSON.parse(usuarioGuardado);
    }

    this.cargarCatalogo();
  }

  cargarCatalogo(): void {
    this.catalogoService.listarPeluquerias().subscribe({
      next: (data: SalonCard[]) => {
        console.log('CATÁLOGO DESDE BACKEND:', data);

        if (data && data.length > 0) {
          this.catalogoCompleto = [...data];
          this.recomendados = [...data];
          this.nuevos = [...data];
        } else {
          this.catalogoCompleto = [...this.recomendados];
          this.nuevos = [...this.recomendados];
        }

        this.busquedaRealizada = false;
        this.sinResultados = false;
      },
      error: (error) => {
        console.log('ERROR AL CARGAR CATÁLOGO:', error);

        this.catalogoCompleto = [...this.recomendados];
        this.nuevos = [...this.recomendados];

        this.busquedaRealizada = false;
        this.sinResultados = false;
      }
    });
  }

  buscarCatalogo(): void {
    let resultado = [...this.catalogoCompleto];

    if (this.ubicacionSeleccionada.trim()) {
      resultado = resultado.filter(card =>
        this.normalizarTexto(card.distrito || card.direccion || '').includes(
          this.normalizarTexto(this.ubicacionSeleccionada)
        )
      );
    }

    if (this.servicioSeleccionado.trim()) {
      resultado = resultado.filter(card =>
        card.servicios?.some(servicio =>
          this.normalizarTexto(servicio).includes(
            this.normalizarTexto(this.servicioSeleccionado)
          )
        )
      );
    }

    this.recomendados = resultado;
    this.nuevos = resultado;

    this.busquedaRealizada = true;
    this.sinResultados = resultado.length === 0;
  }


  normalizarTexto(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  limpiarFiltros(): void {
    this.ubicacionSeleccionada = '';
    this.servicioSeleccionado = '';
    this.fechaSeleccionada = '';

    this.recomendados = [...this.catalogoCompleto];
    this.nuevos = [...this.catalogoCompleto];

    this.busquedaRealizada = false;
    this.sinResultados = false;
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