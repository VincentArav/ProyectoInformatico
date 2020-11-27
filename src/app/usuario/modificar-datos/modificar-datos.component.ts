import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators } from "@angular/forms";
import { HttpClient ,HttpParams ,HttpHeaders} from '@angular/common/http';
import { __await } from 'tslib';
import { ActivatedRoute ,Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.component.html',
  styleUrls: ['./modificar-datos.component.css']
})
export class ModificarDatosComponent implements OnInit {
  form: FormGroup;
  rut: any;

  constructor(private http:HttpClient, private route:ActivatedRoute ,private router:Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      contrasena: new FormControl('',[Validators.maxLength(200)]),
    })
  }
  async Cambiar(){
    this.rut = parseInt(this.route.snapshot.paramMap.get('id'));
    this.http.post('http://localhost:8000/Contrasena/'+this.rut, this.form.value,
    {headers: new HttpHeaders({'Content-Type':'application/json'})}).subscribe(
      (response)=>{
        console.log(response);
        location.reload();
           
      }
    )     
  }
  mostrar_Registro(): void { /* Es para mostrar un mensaje de apruebo */
    Swal.fire({
      title: '¿Está seguro que desea modificar su contraseña?',
      text: "Después podrá volver a cambiarla!",
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
          text:'La contraseña ha sido cambiada.',
          icon:'success',
          confirmButtonColor:'#3085d6',
          confirmButtonText: 'Listo',
        }).then((result1)=>{
          if(result1.value){
            this.Cambiar();
          }
        })
      }
    })
   }

   mostrar_cancelar(): void {
    Swal.fire({
      title: '¿Está seguro que desea cancelar?',
      text: "Tendrá que volver a escribir la contraseña!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, rechazar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        location.reload();
      }
    })
  }

}
