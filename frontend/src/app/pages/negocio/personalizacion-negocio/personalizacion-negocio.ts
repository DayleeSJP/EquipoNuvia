import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-personalizacion-negocio',
  imports: [CommonModule, FormsModule],
  templateUrl: './personalizacion-negocio.html',
  styleUrl: './personalizacion-negocio.css'
})
export class PersonalizacionNegocio {

  portadaPreview = '';
  busqueda = '';

  mostrarModalCategoria = false;
  mostrarModalServicio = false;

  categoriaSeleccionada: number | 'todas' = 'todas';

  categorias: Categoria[] = [
    {
      id: 1,
      nombre: 'Cabello y peinado',
      descripcion: 'Servicios de cabello para clientes',
      color: '#B9DDED',
      servicios: [
        {
          id: 1,
          nombre: 'Corte de pelo',
          descripcion: 'Corte personalizado según estilo del cliente.',
          categoriaId: 1,
          tipoTratamiento: 'Cabello',
          tipoPrecio: 'Fijo',
          precio: 40,
          duracion: '45 min'
        },
        {
          id: 2,
          nombre: 'Tinte',
          descripcion: 'Aplicación de color o retoque de raíz.',
          categoriaId: 1,
          tipoTratamiento: 'Coloración',
          tipoPrecio: 'Fijo',
          precio: 57,
          duracion: '1 h y 15 min'
        },
        {
          id: 3,
          nombre: 'Secado de cabello',
          descripcion: 'Secado y acabado profesional.',
          categoriaId: 1,
          tipoTratamiento: 'Peinado',
          tipoPrecio: 'Fijo',
          precio: 35,
          duracion: '35 min'
        }
      ]
    },
    {
      id: 2,
      nombre: 'Cejas y pestañas',
      descripcion: 'Servicios para mirada y cejas',
      color: '#D8C5FF',
      servicios: [
        {
          id: 4,
          nombre: 'Diseño de cejas',
          descripcion: 'Perfilado y diseño natural de cejas.',
          categoriaId: 2,
          tipoTratamiento: 'Cejas',
          tipoPrecio: 'Fijo',
          precio: 25,
          duracion: '30 min'
        }
      ]
    }
  ];

  nuevaCategoria = {
    nombre: '',
    descripcion: '',
    color: '#B9DDED'
  };

  nuevoServicio: Servicio = {
    id: 0,
    nombre: '',
    descripcion: '',
    categoriaId: 1,
    tipoTratamiento: '',
    tipoPrecio: 'Fijo',
    precio: 0,
    duracion: '45 min'
  };

  trabajadores: Trabajador[] = [];
  nombreTrabajador = '';
  apellidoTrabajador = '';

  sobreNosotros = '';

  coloresCategoria = [
    { nombre: 'Azul claro', valor: '#B9DDED' },
    { nombre: 'Lila', valor: '#D8C5FF' },
    { nombre: 'Dorado', valor: '#C09C75' },
    { nombre: 'Rosa suave', valor: '#F8C8DC' },
    { nombre: 'Verde claro', valor: '#CDECCF' }
  ];

  seleccionarPortada(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.portadaPreview = reader.result as string;
    };

    reader.readAsDataURL(archivo);
  }

  totalServicios(): number {
    return this.categorias.reduce((total, categoria) => {
      return total + categoria.servicios.length;
    }, 0);
  }

  categoriasParaMostrar(): Categoria[] {
    if (this.categoriaSeleccionada === 'todas') {
      return this.categorias;
    }

    return this.categorias.filter(categoria => categoria.id === this.categoriaSeleccionada);
  }

  serviciosFiltrados(categoria: Categoria): Servicio[] {
    if (!this.busqueda.trim()) {
      return categoria.servicios;
    }

    const texto = this.busqueda.toLowerCase();

    return categoria.servicios.filter(servicio =>
      servicio.nombre.toLowerCase().includes(texto)
    );
  }

  abrirModalCategoria(): void {
    this.mostrarModalCategoria = true;
  }

  cerrarModalCategoria(): void {
    this.mostrarModalCategoria = false;
  }

  agregarCategoria(): void {
    if (!this.nuevaCategoria.nombre.trim()) return;

    const nuevaId = Date.now();

    this.categorias.push({
      id: nuevaId,
      nombre: this.nuevaCategoria.nombre,
      descripcion: this.nuevaCategoria.descripcion,
      color: this.nuevaCategoria.color,
      servicios: []
    });

    this.categoriaSeleccionada = nuevaId;

    this.nuevaCategoria = {
      nombre: '',
      descripcion: '',
      color: '#B9DDED'
    };

    this.mostrarModalCategoria = false;
  }

  abrirModalServicio(): void {
    if (this.categoriaSeleccionada !== 'todas') {
      this.nuevoServicio.categoriaId = this.categoriaSeleccionada;
    } else {
      this.nuevoServicio.categoriaId = this.categorias[0]?.id || 1;
    }

    this.mostrarModalServicio = true;
  }

  cerrarModalServicio(): void {
    this.mostrarModalServicio = false;
  }

  agregarServicio(): void {
    if (!this.nuevoServicio.nombre.trim()) return;
    if (!this.nuevoServicio.precio) return;

    const categoria = this.categorias.find(c => c.id === Number(this.nuevoServicio.categoriaId));

    if (!categoria) return;

    categoria.servicios.push({
      ...this.nuevoServicio,
      id: Date.now(),
      categoriaId: Number(this.nuevoServicio.categoriaId)
    });

    this.nuevoServicio = {
      id: 0,
      nombre: '',
      descripcion: '',
      categoriaId: categoria.id,
      tipoTratamiento: '',
      tipoPrecio: 'Fijo',
      precio: 0,
      duracion: '45 min'
    };

    this.mostrarModalServicio = false;
  }

  agregarTrabajador(): void {
    if (!this.nombreTrabajador.trim() || !this.apellidoTrabajador.trim()) return;

    this.trabajadores.push({
      nombre: this.nombreTrabajador,
      apellido: this.apellidoTrabajador
    });

    this.nombreTrabajador = '';
    this.apellidoTrabajador = '';
  }

  guardarCambios(): void {
    const personalizacion = {
      portada: this.portadaPreview,
      categorias: this.categorias,
      trabajadores: this.trabajadores,
      sobreNosotros: this.sobreNosotros
    };

    localStorage.setItem('personalizacionNegocioTemp', JSON.stringify(personalizacion));

    alert('Personalización guardada correctamente.');
  }
}