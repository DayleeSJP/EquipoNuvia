import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-negocio-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './negocio-layout.html',
  styleUrl: './negocio-layout.css',
})
export class NegocioLayout implements OnInit {

  negocioActual: any = null;

  ngOnInit(): void {

    const negocio = localStorage.getItem('negocio');

    if (negocio) {
      this.negocioActual = JSON.parse(negocio);
    }

  }

  inicialNegocio(): string {

    if (!this.negocioActual?.nombreNegocio) {
      return 'SG';
    }

    return this.negocioActual.nombreNegocio
      .charAt(0)
      .toUpperCase();

  }

}
