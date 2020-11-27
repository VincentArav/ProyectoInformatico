import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { ActivatedRoute,Router, NavigationStart } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  rut: any;
  form: FormGroup;

  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl('',[Validators.maxLength(200)]),
      apellido: new FormControl('',[Validators.maxLength(200)]),
      password_U: new FormControl('',[Validators.maxLength(200)]),
      rut: new FormControl('',[Validators.maxLength(200)])
    })
  }
  async onClickSubmit(){
    this.rut = parseInt(this.route.snapshot.paramMap.get('id'));
    this.http.post('http://localhost:8000/NuevoUsuario/'+this.rut, this.form.value,
    {headers: new HttpHeaders({'Content-Type':'application/json'})}).subscribe(
      (response)=>{
        console.log(response);
        location.reload();
           
      }
    ) 
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
