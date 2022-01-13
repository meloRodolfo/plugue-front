import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeiaService } from 'src/app/shared/ideia/ideia.service';
import { UserService } from 'src/app/shared/user/user.service'

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
    private ideiaService: IdeiaService,
    private usuarioService: UserService
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
    this.listInteresse();
  }

  listarIdeiasPorAutor() {
    this.result = [];
    this.ideiaService.buscarIdeiasPorAutor(this.idUsuario).subscribe((ideias) => {
      const objectArray = Object.entries(ideias);
      objectArray.forEach(([key, value]) => {
        if(key === 'myIdeas') this.result = value;
      })
      console.log(this.result);
    });
  }

  listInteresse() {
    this.usuarioService.getInterestingIdeas(this.idUsuario).then(({ idea }) => {
      console.log(idea, "###")
      this.resultInteresse = idea
    })
  }

  addProjeto(){
    this.router_env.navigate(['/cadastrar-ideia', { id: this.idUsuario}])
  }
}
