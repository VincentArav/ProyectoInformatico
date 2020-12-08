import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {
  rut: any;
  form: FormGroup;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl('',[Validators.maxLength(200)]),
      area: new FormControl('',[Validators.maxLength(200)])
    })
  }

  async onClickSubmit(){
    console.log(this.form.value);
    this.http.post('http://localhost:8000/agregarLugar/', this.form.value,
    {headers: new HttpHeaders({'Content-Type':'application/json'})}).subscribe(
      (response)=>{
        console.log(response);
        location.reload();
           
      }
    ) 
    // this.rut = parseInt(this.route.snapshot.paramMap.get('id'));
    // this.http.post('http://localhost:8000/NuevoUsuario/'+this.rut, this.form.value,
    // {headers: new HttpHeaders({'Content-Type':'application/json'})}).subscribe(
    //   (response)=>{
    //     console.log(response);
    //     location.reload();
           
    //   }
    // ) 
  }

  mostrar_Registro(): void { /* Es para mostrar un mensaje de apruebo */
    Swal.fire({
      title: '¿Está seguro que desea agregar a este usuario?',
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
          title:'Añadido!',
          text:'El nuevo usuario ha sido añadido exitosamente!',
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

}
