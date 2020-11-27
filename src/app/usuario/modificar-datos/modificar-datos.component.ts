import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators, FormGroupDirective, NgForm } from "@angular/forms";
import { HttpClient ,HttpParams ,HttpHeaders} from '@angular/common/http';
import { __await } from 'tslib';
import { ActivatedRoute ,Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.component.html',
  styleUrls: ['./modificar-datos.component.css']
})
export class ModificarDatosComponent implements OnInit {
  form: FormGroup;
  rut: any;
  matcher = new MyErrorStateMatcher();

  constructor(private http:HttpClient, private route:ActivatedRoute ,private router:Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      password: ['',[Validators.required]],
      confirmPassword: ['']
    }, {validator: this.checkPasswords});
   }
   checkPasswords(group: FormGroup){
     let pass = group.controls.password.value;
     let confirmPass = group.controls.confirmPassword.value;

     return pass === confirmPass ? null : {notSame: true}
   }

  ngOnInit() {
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
