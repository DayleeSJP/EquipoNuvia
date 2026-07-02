import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogoService } from '../../../services/catalogo';

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
  selector: 'app-detalle-negocio',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-negocio.html',
  styleUrl: './detalle-negocio.css'
})
export class DetalleNegocio implements OnInit {

  nombreNegocio = 'Mi Negocio';
  direccion = 'Dirección pendiente';
  distrito = 'Lima';
  portada = '';
  sobreNosotros = '';

  categorias: Categoria[] = [];
  trabajadores: Trabajador[] = [];

  constructor(
  private router: Router,
  private route: ActivatedRoute,
  private catalogoService: CatalogoService
) {}

  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  if (id) {
    this.catalogoService.obtenerDetalle(id).subscribe({
      next: (data: any) => {
        this.nombreNegocio = data.nombreNegocio || 'Mi Negocio';
        this.direccion = data.direccion || 'Dirección pendiente';
        this.distrito = data.distrito || 'Lima';
        this.portada = data.portada || '';
        this.categorias = data.categorias || [];
        this.trabajadores = data.trabajadores || [];
        this.sobreNosotros = data.sobreNosotros || '';
      },
      error: () => {
        this.cargarDetalleLocal();
      }
    });

    return;
  }

  this.cargarDetalleLocal();
}

cargarDetalleLocal(): void {
  const negocioGuardado = localStorage.getItem('registroNegocioTemp');
  const personalizacionGuardada = localStorage.getItem('personalizacionNegocioTemp');

  if (negocioGuardado) {
    const negocio = JSON.parse(negocioGuardado);
    this.nombreNegocio = negocio.nombreNegocio || 'Mi Negocio';
    this.direccion = negocio.direccion || 'Dirección pendiente';
    this.distrito = negocio.distrito || 'Lima';
  }

  if (personalizacionGuardada) {
    const personalizacion = JSON.parse(personalizacionGuardada);
    this.portada = personalizacion.portada || '';
    this.categorias = personalizacion.categorias || [];
    this.trabajadores = personalizacion.trabajadores || [];
    this.sobreNosotros = personalizacion.sobreNosotros || '';
  }
}


  totalServicios(): number {
    return this.categorias.reduce((total, categoria) => total + categoria.servicios.length, 0);
  }

  reservar(servicio?: Servicio): void {
    if (servicio) {
      localStorage.setItem('servicioSeleccionadoTemp', JSON.stringify(servicio));
    } else {
      localStorage.removeItem('servicioSeleccionadoTemp');
    }

    this.router.navigate(['/cliente/reserva']);
  }
}