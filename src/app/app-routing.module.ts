import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { FotoComponent } from './foto/foto.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {path:'',component:LoginComponent },
  {
    path: 'contenido',
    component:ContenidoComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_USER'}
  },
  {
    path: 'foto/:id',
    component:FotoComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_USER'}
  },
  {
    path: 'formulario/:id',
    component:FormularioComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}
  },
  {
    path: 'formulario',
    component:FormularioComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}
  },
  {path: 'login',
  component:LoginComponent},
  {path:'**',pathMatch:'full', redirectTo:'login'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
