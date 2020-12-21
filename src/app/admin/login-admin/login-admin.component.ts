import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpParams ,HttpHeaders} from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  form: FormGroup;
  ejem: any;
  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.form=new FormGroup({
    rut_admin:new FormControl('', [Validators.required]),
    contrasena_login:new FormControl('',[Validators.required])
    }); 
  }

  async onClickSubmit(){

    this.http.post<any>('http://localhost:8000/login_adm', this.form.value,
    { headers: new HttpHeaders({ 'Content-Type':'application/json'})}).subscribe(
      (res)=>{
        console.log(res.data.rowCount)
        if(res.data.rowCount==1){
          this.router.navigate(['/app-aprobar/'+res.data.rows[0].rut_admin])
        }else{
          console.log("esto")
        }
      }
    )
  }

}
