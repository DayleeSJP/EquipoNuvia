import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SalonCard {
  id?: number;
  nombre: string;
  direccion: string;
  distrito?: string;
  tipo: string;
  rating: string;
  imagen: string;
  servicios?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  private apiUrl = 'http://localhost:8080/api/catalogo';

  constructor(private http: HttpClient) {}

  listarPeluquerias(): Observable<SalonCard[]> {
    return this.http.get<SalonCard[]>(`${this.apiUrl}/peluquerias`);
  }

  obtenerDetalle(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/peluquerias/${id}`);
  }
}