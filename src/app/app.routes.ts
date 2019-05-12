import { RouterModule, Routes, Router } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';

import { HomeComponent } from './components/home/home.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';
import { RecetaIndividualComponent } from './components/recetas/receta-individual.component';
import { LoginComponent } from './components/usuarios/login.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { AuthGuard } from './services/guard/auth.guard';
import { RoleGuard } from './services/guard/role.guard';

const APP_ROUTES: Routes = [
  { path: 'recetas', component: HomeComponent },
  { path: 'receta/:id', component: RecetaIndividualComponent },
  { path: 'recetas/page/:page', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'buscar/:termino', component: BuscadorComponent },
  { path: 'protegida', component: ProtegidaComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'recetas' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
