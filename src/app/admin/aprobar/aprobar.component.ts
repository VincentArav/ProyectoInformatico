import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators } from "@angular/forms";
import { HttpClient ,HttpParams ,HttpHeaders} from '@angular/common/http';
import { __await } from 'tslib';
import { ActivatedRoute ,Router } from '@angular/router';
import Swal from 'sweetalert2'

interface Material{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-aprobar',
  templateUrl: './aprobar.component.html',
  styleUrls: ['./aprobar.component.css']
})

export class AprobarComponent implements OnInit {
  Form2 : FormGroup; /* Esta variable sera la principal donde se agrupen el resto de variables que seran utilizadas en el HTML*/
  mostrarMensaje:boolean;
  mostrarError:boolean;
  rut_id: any;
  id: any;
  orden: any;
  public auxiliar:boolean;
  public lista_ordenes: Material[] = [];
  public filtrados: any;

  arreglo = [];
  orden_ = [];
  material = [];
  especificaciones = [];

  public Lista: any; /* Variable donde se pueden almacenar varios datos */
  public Lista_1: any;
  displayedColumns: string[] = ['ID',  'NombreCompleto', 'Material', 'Cantidad', 'Comentario', 'Fecha'] /* Es el nombre de las columnas*/
  
  constructor(private http:HttpClient, private route:ActivatedRoute ,private router:Router) { /* Colocarlo siempre en general */
    this.getOrdenes();
  }

  async ngOnInit() {
    this.auxiliar = false;
    this.Form2 = new FormGroup({ /* Aqui se declaran todas las variables que se ocuparan para almacenar o mostrar datos del HTML, ya sean de la BD o declaradas aqui mismo */
      id_orden: new FormControl('', [Validators.required]),    
    });
    
  }

  async getOrdenes(){ /* Consulta estandar para traer datos desde la BD, despues :8000/ el nombre que le das en la consulta del server.js */
    this.Lista = await
    this.http.get('http://localhost:8000/ordenes').toPromise()
    console.log(this.Lista);
    let aux: any;
    aux = this.Lista.data;
    for(let i of aux){
      this.lista_ordenes.push({value: i.id, viewValue: i.nombre});
    }
    this.filtrados = this.lista_ordenes.slice();
  }
  
  public onSubmit(){
    this.auxiliar = true;
    this.id= this.Form2.value.id_orden; /* Le doy un valor para despues enviarselo a la consulta */
    this.getListado();
  }
  async getListado(){
    this.auxiliar = true;
    let params = new HttpParams().set("id_orden", this.id);
    this.Lista_1 = await this.http.get('http://localhost:8000/ListadoMateriales/'+this.id,{headers: new HttpHeaders({
    'Content-Type':'application/json'  
  }), params : params}).toPromise();
  console.log(this.Lista_1)
  }

  async correo(){
    this.http.post(`http://localhost:8000/enviarCorreo`,{ 
      orden: this.Form2.value.id_orden,
      ordenes:this.orden_, 
      materiales:this.material,
      especificaciones:this.especificaciones,
    }).subscribe(
      (response)=>{
        console.log(response);
      }
    ) 
  }

  async Aprobar(){
    this.rut_id = parseInt(this.route.snapshot.paramMap.get('id')); /* Declaro esto porque le pasare una variable a la consulta */
    console.log(this.Form2.value.id_orden )
      this.http.post('http://localhost:8000/Aprobar', this.Form2.value,
      {headers: new HttpHeaders({'Content-Type':'application/json'})}).subscribe(
        (response)=>{
          console.log(response);
          location.reload();
        }
      )    
  }

  async Rechazar(){
    this.rut_id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.Form2.value.id_orden )
      this.http.post('http://localhost:8000/Rechazar', this.Form2.value,
      {headers: new HttpHeaders({'Content-Type':'application/json'})}).subscribe(
        (response)=>{
          console.log(response);
          location.reload();
        }
      ) 
  }

  async onClickSubmit(){
    this.rut_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.http.post('http://localhost:8000/reg_hosp/'+this.rut_id, this.Form2.value,
    {headers: new HttpHeaders({'Content-Type':'application/json'})}).subscribe(
      (response)=>{
        console.log(response);
        location.reload();
      }
    )    
  }
  mostrar_Registro(): void { /* Es para mostrar un mensaje de apruebo */
    Swal.fire({
      title: '¿Está seguro que desea aprobar esta orden?',
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
          text:'La orden ha sido aprobada.',
          icon:'success',
          confirmButtonColor:'#3085d6',
          confirmButtonText: 'Listo',
        }).then((result1)=>{
          if(result1.value){
            this.Aprobar();
            this.correo();
          }
        })
      }
    })
   }

   mostrar_cancelar(): void {
    Swal.fire({
      title: '¿Está seguro que desea rechazar la orden?',
      text: "No podrá recuperarlos!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, rechazar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.Rechazar();
      }
    })
  }
}
