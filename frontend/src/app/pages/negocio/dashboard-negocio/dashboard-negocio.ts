import { Component } from '@angular/core';

export interface Cita {
  id: number;
  hora: string;
  cliente: string;
  servicio: string;
  duracion: number;
  fecha: Date;
}

@Component({
  selector: 'app-dashboard-negocio',
  templateUrl: './dashboard-negocio.html',
  styleUrl: './dashboard-negocio.css'
})
export class DashboardNegocio {

  citas: Cita[] = [
    {
      id: 1,
      hora: '10:00',
      cliente: 'Sofia',
      servicio: 'Manicura completa',
      duracion: 60,
      fecha: new Date()
    },
    {
      id: 2,
      hora: '12:45',
      cliente: 'Wendy',
      servicio: 'Corte de pelo',
      duracion: 45,
      fecha: new Date()
    },
    {
      id: 3,
      hora: '13:00',
      cliente: 'Lucia',
      servicio: 'Tratamiento facial',
      duracion: 60,
      fecha: new Date()
    },
    {
      id: 4,
      hora: '15:30',
      cliente: 'Carlos',
      servicio: 'Coloración',
      duracion: 90,
      fecha: new Date()
    }
  ];

  verDetalles(cita: Cita) {
    console.log('Ver detalles de cita:', cita);
  }

  cancelarCita(cita: Cita) {
    if (confirm(`¿Cancelar la cita de ${cita.cliente}?`)) {
      console.log('Cita cancelada:', cita);
    }
  }

  iniciarCita(cita: Cita) {
    console.log('Iniciar cita:', cita);
  }

  verTodasLasCitas() {
    console.log('Ver todas las citas');
  }
}
