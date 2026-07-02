import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-negocio-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './negocio-layout.html',
  styleUrl: './negocio-layout.css',
})
export class NegocioLayout {}
