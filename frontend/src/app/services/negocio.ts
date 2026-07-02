import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServicioRequest {
  nombre: string;
  descripcion: string;
  tipoTratamiento: string;
  tipoPrecio: string;
  precio: number;
  duracion: string;
}

export interface CategoriaRequest {
  nombre: string;
  descripcion: string;
  color: string;
  servicios: ServicioRequest[];
}

export interface TrabajadorRequest {
  nombre: string;
  apellido: string;
}

export interface PersonalizacionNegocioRequest {
  usuarioId: number;
  nombreNegocio: string;
  direccion: string;
  distrito: string;
  portadaImagen: string;
  sobreNosotros: string;
  categorias: CategoriaRequest[];
  trabajadores: TrabajadorRequest[];
}

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  private apiUrl = 'http://localhost:8080/api/negocio';

  constructor(private http: HttpClient) {}

  guardarPersonalizacion(data: PersonalizacionNegocioRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/personalizacion`, data);
  }
}