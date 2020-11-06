import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-desing-admin',
  templateUrl: './desing-admin.component.html',
  styleUrls: ['./desing-admin.component.css']
})
export class DesingAdminComponent implements OnInit {
  rut:any;
  ejem:any;
  constructor(private http:HttpClient, private route: ActivatedRoute ,private router:Router) { }

  async ngOnInit() {
    this.rut=parseInt(this.route.snapshot.paramMap.get('id'))
    this.ejem = await
    this.http.get('http://localhost:8000/datosUser/'+this.rut).toPromise();
    console.log(this.ejem.data.rows); 
  }

}
