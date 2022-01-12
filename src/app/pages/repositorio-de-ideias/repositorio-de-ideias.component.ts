import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeiaService } from 'src/app/shared/ideia/ideia.service';

@Component({
  selector: 'app-repositorio-de-ideias',
  templateUrl: './repositorio-de-ideias.component.html',
  styleUrls: ['./repositorio-de-ideias.component.css']
})
export class RepositorioDeIdeiasComponent implements OnInit {

  readonly apiURL : string;
  result : Array<any>;
  resultInteresse : Array<any>;
  idUsuario: any = '';
  tipoSession: any = '';

  constructor(
    private http : HttpClient,
    private route_rec: ActivatedRoute,
    private router_env: Router,
    private ideiaService: IdeiaService
    ) {
    // this.apiURL = 'https://plugue.herokuapp.com/';
    this.apiURL = ''
    this.result = [];
    this.resultInteresse = [];
    this.idUsuario = this.route_rec.snapshot.paramMap.get('id');
    this.tipoSession = sessionStorage.getItem("tipo");
  }

  ngOnInit(): void {
    this.listarIdeiasPorAutor();
    // this.listInteresse();
  }

  // listIdeas() {
  //   const headers = new HttpHeaders({
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  //     "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
  //     "Content-Type": "application/json"
  //   });

  //   return this.http.get(`${this.apiURL}/ideia?id=${this.idSession}`, { headers }).toPromise().then(ideias => {
  //     const objectArray = Object.entries(ideias);
  //     objectArray.forEach(([ key, value ]) => {
  //       this.result.push(value);
  //     })
  //     console.log(this.result)
  //   });
  // }

  listarIdeiasPorAutor() {
    this.ideiaService.buscarIdeiasPorAutor(this.idUsuario).subscribe((ideias) => {
      const objectArray = Object.entries(ideias);
      objectArray.forEach(([key, value]) => {
        if(key === 'myIdeas') this.result = value;
      })
      console.log(this.result);
    });

    // this.ideiaService.listarIdeias(this.idUsuario).subscribe((ideias) => {
    //   const objectArray = Object.entries(ideias);
    //   objectArray.forEach(([key, value]) => {
    //     if(key === 'interestingIdeas') this.ideias = value;
    //   })
    //   console.log(this.ideias);
    // });
  }

  listInteresse() {
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
      "Content-Type": "application/json"
    });

    return this.http.get(`${this.apiURL}/aluno/${this.idUsuario}/projetos`, { headers }).toPromise().then(ideias => {
      const objectArray = Object.entries(ideias);
      objectArray.forEach(([ key, value ]) => {
        this.resultInteresse.push(value);
      })
    });
  }

  addProjeto(){
    this.router_env.navigate(['/cadastrar-ideia', { id: this.idUsuario}])
  }
}
