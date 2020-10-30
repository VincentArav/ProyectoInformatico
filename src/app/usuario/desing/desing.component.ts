import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-desing',
  templateUrl: './desing.component.html',
  styleUrls: ['./desing.component.css']
})
export class DesingComponent implements OnInit {
  rut:any;
  ejem:any;
  constructor(private http:HttpClient, private route: ActivatedRoute ,private router:Router) { }

  async ngOnInit() {
    this.rut=parseInt(this.route.snapshot.paramMap.get('id'))
    this.ejem = await
    this.http.get('http://localhost:8000/nombreUsuario/'+this.rut).toPromise();
    console.log(this.ejem.data.rows);    
  }

}
