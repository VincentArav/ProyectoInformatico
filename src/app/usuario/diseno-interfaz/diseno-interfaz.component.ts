import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-diseno-interfaz',
  templateUrl: './diseno-interfaz.component.html',
  styleUrls: ['./diseno-interfaz.component.css']
})
export class DisenoInterfazComponent implements OnInit {
  rut:any;
  constructor(private route: ActivatedRoute ,private router:Router) { }

  ngOnInit() {
    this.rut=parseInt(this.route.snapshot.paramMap.get('id'))
  }

  onClick_GenerarS(){
    this.router.navigate(['/app-solicitud/'+this.rut])
  }

  onClick_AddMaterial(){
    this.router.navigate(['/app-add-material/'+this.rut])}

  onClick_Cambiar(){
     this.router.navigate(['/app-modificar-datos/'+this.rut])}

  onClick_Cerrar(){
    this.router.navigate(['/app-inicio'])
  }

}
