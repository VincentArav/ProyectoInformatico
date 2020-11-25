import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatNativeDateModule, MatIconModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule, MatTabsModule } from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AddMaterialComponent } from './usuario/add-material/add-material.component';
import { LoginComponent } from './usuario/login/login.component';
import { DisenoInterfazComponent } from './usuario/diseno-interfaz/diseno-interfaz.component';
import { DesingComponent } from './usuario/desing/desing.component';
import { SolicitudComponent } from './usuario/solicitud/solicitud.component';
import { AdminComponent } from './admin/admin.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { DesingAdminComponent } from './admin/desing-admin/desing-admin.component';
import { DisenoAdminComponent } from './admin/diseno-admin/diseno-admin.component';
import { AprobarComponent } from './admin/aprobar/aprobar.component';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MostrarOrdenComponent } from './admin/mostrar-orden/mostrar-orden.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    UsuarioComponent,
    AddMaterialComponent,
    LoginComponent,
    DisenoInterfazComponent,
    DesingComponent,
    SolicitudComponent,
    AdminComponent,
    LoginAdminComponent,
    DesingAdminComponent,
    DisenoAdminComponent,
    AprobarComponent,
    MostrarOrdenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule ,
    MatInputModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatTableModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectFilterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
