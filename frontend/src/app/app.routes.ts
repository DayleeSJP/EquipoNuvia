import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { SeleccionUsuario } from './pages/seleccion-usuario/seleccion-usuario';
import { RegistroCliente } from './pages/registro-cliente/registro-cliente';

export const routes: Routes = [
    {
    path: '',
    component: Home
  },
  {
    path: 'seleccion-usuario',
    component: SeleccionUsuario
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'registro-cliente',
    component: RegistroCliente
  }
];
