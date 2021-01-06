import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { ActivatedRoute,Router, NavigationStart } from '@angular/router';
import Swal from 'sweetalert2'

interface Material{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  rut: any;
  form: FormGroup;
  fecha: string;
  destino: string;
  comentario_orden: string;
  public Lista1: any;
  public Lista2: any;
  public lista_materiales: Material[] = [];
  public lista_destino: Material[] = [];
  public filtrados: any;
  panelOpenState = false;
  indice = 0;

  arreglo = [];
  cantidad = [];
  material = [];
  especificaciones = [];

  destino_final: number;

  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router) { 
    this.getMateriales();
    this.getDestino();
    this.fecha= new Date().toLocaleDateString('es-CL');
    this.arreglo.push(1);
    this.rut = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.material.push("");
  }

  anadir_material(){
    this.arreglo.push("");
    this.cantidad.push("");
    this.material.push("");
    this.especificaciones.push("");
    console.log(this.comentario_orden);
  }

  enviar_orden(){
      console.log(this.material)
      console.log(this.cantidad)
      console.log(this.rut)
      console.log(this.destino)
      console.log(this.especificaciones)
      console.log(this.comentario_orden)
      console.log(this.lista_destino)
      console.log(this.destino_final)
      this.http.post('http://localhost:8000/ADDSolicitud/', {
        rut:this.rut, 
        cantidad:this.cantidad, 
        materiales:this.material,
        destino:this.destino_final, 
        especificaciones:this.especificaciones,
        comentario_orden:this.comentario_orden}).subscribe(
      (response)=>{
        console.log(response);
      }
    ) 
    location.reload();
  }

  async getMateriales(){
    this.Lista1 = await
    this.http.get(`http://localhost:8000/ListadoMateriales`).toPromise();
    console.log(this.Lista1);
    let aux: any;
    aux = this.Lista1.data;
    for(let i of aux){
      console.log(typeof(this.lista_materiales));
      this.lista_materiales.push({value: i.id, viewValue: i.nombre});
      console.log(i);
    }
    this.filtrados = this.lista_materiales.slice();
    console.log(this.lista_materiales)
  }
  async getDestino(){
    this.Lista2 = await
    this.http.get(`http://localhost:8000/ListadoLugares`).toPromise();
    console.log(this.Lista2)
    let aux: any;
    aux = this.Lista2.data;
    for(let i of aux){
      console.log(typeof(this.lista_destino));
      this.lista_destino.push({value: i.id, viewValue: i.nombre});
      console.log(i);
    }
    //this.filtrados = this.lista_destino.slice();
  }
  
  mostrar_Registro(): void {
    Swal.fire({
      title: '¿Está seguro que desea enviar la solicitud?',
      text: "No podrá realizar cambios!",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, enviar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title:'Registrado!',
          text:'La solicitud ha sido enviada exitosamente!',
          icon:'success',
          confirmButtonColor:'#3085d6',
          confirmButtonText: 'Listo',
        }).then((result1)=>{
          if(result1.value){
            this.enviar_orden();
          }
        })
      }
    })
   }

   mostrar_cancelar(): void {
    Swal.fire({
      title: '¿Está seguro que desea borrar los datos de la solicitud?',
      text: "No podrá recuperarlos!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        location.reload();
      }
    })
  }

  eliminar_material(j: number) {
    this.arreglo.splice(j,1);
    this.cantidad.splice(j,1);
    this.material.splice(j,1);
    this.especificaciones.splice(j,1);
  }

  nombre_material(x:string) {
    for (let i=0; i<this.lista_materiales.length; i++){
      if(this.lista_materiales[i].value === x){
        return this.lista_materiales[i].viewValue
      }
    }
  }
  
  mandar_correo() {
    this.http.get(`http://localhost:8000/enviarCorreo`).toPromise();
  }


}
