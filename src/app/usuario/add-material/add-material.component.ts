import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { ActivatedRoute,Router, NavigationStart } from '@angular/router';
import Swal from 'sweetalert2'

interface Cantidad{/* Igual que una struct */
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit { /* Aqui les doy valores */
  cantidad: Cantidad[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
    {value: '6', viewValue: '6'},
    {value: '7', viewValue: '7'},
    {value: '8', viewValue: '8'},
    {value: '9', viewValue: '9'},
    {value: '10', viewValue: '10'},
    {value: '15', viewValue: '15'},
    {value: '20', viewValue: '20'},
    {value: '25', viewValue: '25'},
    {value: '30', viewValue: '30'},
    {value: '35', viewValue: '35'},
    {value: '40', viewValue: '40'},
    {value: '45', viewValue: '45'},
    {value: '50', viewValue: '50'},
    {value: '60', viewValue: '60'},
    {value: '70', viewValue: '70'},
    {value: '80', viewValue: '80'},
    {value: '90', viewValue: '90'},
    {value: '100', viewValue: '100'}
  ];
  rut: any;
  form: FormGroup;
  fecha: string;
  public Lista1: any;
  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router) { 
    this.getMateriales();
    this.fecha= new Date().toLocaleDateString('es-CL'); /* Es para obtener la fecha del PC */
  }

  ngOnInit() {
    this.form = new FormGroup({
      descripcion_r: new FormControl('',[Validators.maxLength(200)]),
      cantidad_r: new FormControl('', [Validators.required]),
      nombre_r: new FormControl('',[Validators.maxLength(200)]),
    })
  }
  async onClickSubmit(){
    this.rut = parseInt(this.route.snapshot.paramMap.get('id'));
    this.http.post('http://localhost:8000/ADDMaterial/'+this.rut, this.form.value,
    {headers: new HttpHeaders({'Content-Type':'application/json'})}).subscribe(
      (response)=>{
        console.log(response);
        location.reload();
           
      }
    ) 
  }
  async getMateriales(){
    /*this.Lista1 = await
    this.http.get(`http://localhost:8000/ListadoMateriales`).toPromise();
    console.log(this.Lista1)
    */
  }
  mostrar_Registro(): void { /* Es para mostrar un mensaje de apruebo */
    Swal.fire({
      title: '¿Está seguro que desea agregar el material?',
      text: "No podrá realizar cambios!",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, agregar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title:'Registrado!',
          text:'El nuevo material ha sido registrado exitosamente!',
          icon:'success',
          confirmButtonColor:'#3085d6',
          confirmButtonText: 'Listo',
        }).then((result1)=>{
          if(result1.value){
            this.onClickSubmit();
          }
        })
      }
    })
   }

   mostrar_cancelar(): void {
    Swal.fire({
      title: '¿Está seguro que desea borrar el formulario?',
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
}
