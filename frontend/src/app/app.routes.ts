import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { SeleccionUsuario } from './pages/seleccion-usuario/seleccion-usuario';
import { RegistroCliente } from './pages/registro-cliente/registro-cliente';
import { RegistroNegocio } from './pages/registro-negocio/registro-negocio';
import { NegocioLayout } from './pages/negocio/negocio-layout/negocio-layout';
import { DashboardNegocio } from './pages/negocio/dashboard-negocio/dashboard-negocio';
import { CalendarioNegocio } from './pages/negocio/calendario-negocio/calendario-negocio'
import { PersonalizacionNegocio } from './pages/negocio/personalizacion-negocio/personalizacion-negocio';


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
    },
    {
        path: 'registro-negocio',
        component: RegistroNegocio
    },
    {
        path: 'negocio',
        component: NegocioLayout,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardNegocio
            },
            {
                path: 'calendario',
                component: CalendarioNegocio
            },
            {
                path: 'personalizacion',
                component: PersonalizacionNegocio
            }
        ]
    }

];
