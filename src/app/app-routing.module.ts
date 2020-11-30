import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './inicio/inicio.component';
import { DisenoInterfazComponent } from './usuario/diseno-interfaz/diseno-interfaz.component';
import {LoginComponent} from './usuario/login/login.component';
import {AddMaterialComponent} from './usuario/add-material/add-material.component';
import {DesingComponent} from './usuario/desing/desing.component';
import {SolicitudComponent} from './usuario/solicitud/solicitud.component';
import {UsuarioComponent} from './usuario/usuario.component';
import {AdminComponent} from './admin/admin.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { DesingAdminComponent } from './admin/desing-admin/desing-admin.component';
import { DisenoAdminComponent } from './admin/diseno-admin/diseno-admin.component';
import { AprobarComponent } from './admin/aprobar/aprobar.component';
import { MostrarOrdenComponent } from './admin/mostrar-orden/mostrar-orden.component';
import { MostrarOrdenUsuarioComponent } from './usuario/mostrar-orden-usuario/mostrar-orden-usuario.component';
import { RegistrarComponent } from './admin/registrar/registrar.component';
import { ModificarDatosComponent } from './usuario/modificar-datos/modificar-datos.component';


const routes: Routes = [
  {path:'', component:InicioComponent},
  {path:'app-login',component:LoginComponent},
  {path:'app-login-admin',component:LoginAdminComponent},
  {path:'app-inicio',component:InicioComponent},
  {path:'app-usuario', component:UsuarioComponent},
  {path:'app-admin',component:AdminComponent},
  {path:'app-diseno-interfaz/:id',component:DisenoInterfazComponent},
  {path:'app-diseno-admin/:id',component:DisenoAdminComponent},  
  {path:'app-desing/:id',component:DesingComponent},
  {path:'app-desing-admin/:id',component:DesingAdminComponent},
  {path:'app-solicitud/:id',component:SolicitudComponent},    
  {path:'app-add-material/:id',component:AddMaterialComponent},  
  {path:'app-aprobar/:id',component:AprobarComponent},
  {path:'app-mostrar-orden/:id',component:MostrarOrdenComponent},
  {path:'app-mostrar-orden-usuario/:id',component:MostrarOrdenUsuarioComponent},
  {path:'app-registrar/:id',component:RegistrarComponent},
  {path:'app-modificar-datos/:id',component:ModificarDatosComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
