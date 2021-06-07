import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-repositorio-de-projetos',
  templateUrl: './repositorio-de-projetos.component.html',
  styleUrls: ['./repositorio-de-projetos.component.css']
})
export class RepositorioDeProjetosComponent implements OnInit {
  readonly apiURL : string;
  result : Array<any>;
  resultInteresse : Array<any>;
  idSession: any = '';
  tipoSession: any = '';

  constructor(
    private http : HttpClient,
    private route_rec: ActivatedRoute,
    private router_env: Router
    ) {
    // this.apiURL = `https://plugue.herokuapp.com`;
    this.apiURL = `http://127.0.0.1:8080`;
    this.result = [];
    this.resultInteresse = [];
    this.idSession = sessionStorage.getItem("id");
    this.tipoSession = sessionStorage.getItem("tipo");
  }

  ngOnInit(): void { 
    this.idSession = this.route_rec.snapshot.paramMap.get('id');   
    this.listProjetos();
    this.listInteresse();
  }

  listProjetos() {
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
      "Content-Type": "application/json"
    });

    return this.http.get(`${this.apiURL}/projeto?id=${this.idSession}`, { headers }).toPromise().then(projetos => {
      const objectArray = Object.entries(projetos);
      objectArray.forEach(([ key, value ]) => {
        this.result.push(value);
      })
    });
  }

  listInteresse() {
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
      "Content-Type": "application/json"
    });

    return this.http.get(`${this.apiURL}/professor/${this.idSession}/ideias`, { headers }).toPromise().then(projetos => {
      const objectArray = Object.entries(projetos);
      objectArray.forEach(([ key, value ]) => {
        this.resultInteresse.push(value);
      })
    });
  }

  addProjeto(){
    this.router_env.navigate(['/cadastrar-projeto', { id: this.idSession}])
  }

}
