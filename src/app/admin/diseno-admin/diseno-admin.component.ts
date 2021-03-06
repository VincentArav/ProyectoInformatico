import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-diseno-admin',
  templateUrl: './diseno-admin.component.html',
  styleUrls: ['./diseno-admin.component.css']
})
export class DisenoAdminComponent implements OnInit {
  rut:any;
  constructor(private route: ActivatedRoute ,private router:Router) { }

  ngOnInit() {
    this.rut=parseInt(this.route.snapshot.paramMap.get('id'))
  }

  onClick_AddMaterial(){
    this.router.navigate(['/app-add-material/'+this.rut])}

  onClick_Aprobar(){
    this.router.navigate(['/app-aprobar/'+this.rut])
  }
  onClick_AddUser(){
    this.router.navigate(['/app-registrar/'+this.rut])
  }
  onClick_Cerrar(){
    this.router.navigate(['/app-inicio'])
  }
  onClick_Estado(){
    this.router.navigate(['/app-mostrar-orden/'+this.rut])
  }
  onClick_AddProject(){
    this.router.navigate(['/app-agregar-proyecto/'+this.rut])
  }
  onClick_DeleteProject(){
    this.router.navigate(['/app-obtener-lugar/'+this.rut])
  }

}
