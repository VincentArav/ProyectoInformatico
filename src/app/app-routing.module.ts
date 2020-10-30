import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './inicio/inicio.component';
import { DisenoInterfazComponent } from './usuario/diseno-interfaz/diseno-interfaz.component';
import {LoginComponent} from './usuario/login/login.component';
import {AddMaterialComponent} from './usuario/add-material/add-material.component';
import {DesingComponent} from './usuario/desing/desing.component';
import {SolicitudComponent} from './usuario/solicitud/solicitud.component';
import {UsuarioComponent} from './usuario/usuario.component';


const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'app-login',component:LoginComponent},
  {path:'app-inicio',component:InicioComponent},
  {path:'app-usuario', component:UsuarioComponent},
  {path:'app-diseno-interfaz/:id',component:DisenoInterfazComponent},
  {path:'app-add-material/:id',component:AddMaterialComponent},
  {path:'app-desing/:id',component:DesingComponent},
  {path:'app-solicitud/:id',component:SolicitudComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
