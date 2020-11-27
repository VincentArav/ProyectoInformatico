import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators } from "@angular/forms";
import { HttpClient ,HttpParams ,HttpHeaders} from '@angular/common/http';
import { __await } from 'tslib';
import { ActivatedRoute ,Router } from '@angular/router';
import Swal from 'sweetalert2'

interface Estado{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mostrar-orden-usuario',
  templateUrl: './mostrar-orden-usuario.component.html',
  styleUrls: ['./mostrar-orden-usuario.component.css']
})
export class MostrarOrdenUsuarioComponent implements OnInit {

  estado: Estado[] = [
    {value: '1', viewValue:'Pendiente'},
    {value: '2', viewValue:'Aprobado'},
    {value: '3', viewValue:'Rechazado'}
  ];
  Form2 : FormGroup;
  mostrarMensaje:boolean;
  mostrarError:boolean;
  rut_id: any;
  id: any;
  public auxiliar:boolean;

  public Lista: any;
  public Lista_1: any;
  displayedColumns: string[] = ['ID',  'NombreCompleto', 'Destino', 'Fecha']
  constructor(private http:HttpClient, private route:ActivatedRoute ,private router:Router) { 
    this.getOrdenes();
  }

  async getOrdenes(){
    this.Lista = await
    this.http.get('http://localhost:8000/ordenes').toPromise()
    console.log(this.Lista)
  }
  ngOnInit() {    
    this.auxiliar = false;
    this.Form2 = new FormGroup({
      id_orden: new FormControl('', [Validators.required]),    
    });
  }
  public onSubmit(){
    this.auxiliar = true;
    this.id= this.Form2.value.id_orden;
    this.getListado();
  }
  async getListado(){
    this.auxiliar = true;
    let params = new HttpParams().set("id_orden", this.id);
    this.Lista_1 = await this.http.get('http://localhost:8000/ListadoOrdenes/'+this.id,{headers: new HttpHeaders({
    'Content-Type':'application/json'  
  }), params : params}).toPromise();
  console.log(this.Lista_1)
  }

}
