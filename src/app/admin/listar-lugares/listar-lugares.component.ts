import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-lugares',
  templateUrl: './listar-lugares.component.html',
  styleUrls: ['./listar-lugares.component.css']
})
export class ListarLugaresComponent implements OnInit {

  lugares = [];

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get("http://localhost:8000/obtenerLugares/").subscribe((response:any) => {
      this.lugares = response.data;
      console.log(this.lugares);
    })
  }

  eliminar(id:number) {
    this.http.delete("http://localhost:8000/eliminarLugar/"+id).subscribe((response:any)=>{
      this.http.get("http://localhost:8000/obtenerLugares/").subscribe((response:any) => {
      this.lugares = response.data;
      console.log(this.lugares);
    });
    });
  }

}
