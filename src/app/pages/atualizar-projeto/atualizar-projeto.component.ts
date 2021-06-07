import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professor } from 'src/app/shared/professor/professor';
import { Projeto } from 'src/app/shared/projeto/projeto';
import { ProjetoService } from 'src/app/shared/projeto/projeto.service';

@Component({
  selector: 'app-atualizar-projeto',
  templateUrl: './atualizar-projeto.component.html',
  styleUrls: ['./atualizar-projeto.component.css']
})
export class AtualizarProjetoComponent implements OnInit {
  readonly id: String;
  descricao: String;
  titulo: String;
  area: String;
  alunos: Array<any>;
  projeto: Projeto = new Projeto();
  professor: Professor = new Professor();
  idSession: any = '';
  tipoSession: any = '';

  constructor(route: ActivatedRoute, private projetoService: ProjetoService, private router: Router) {
    this.id = route.snapshot.params.projetoId;
    this.titulo = route.snapshot.params.titulo;
    this.descricao = route.snapshot.params.descricao;
    this.area = route.snapshot.params.area;
    this.professor.id = route.snapshot.params.criador;
    this.alunos = route.snapshot.params.interessados || []
    this.idSession = sessionStorage.getItem("id");
    this.tipoSession = sessionStorage.getItem("tipo");
  }

  ngOnInit(): void {
  }

  atualizarProjeto() {
    this.projeto.titulo = (document.getElementById('tituloProjeto') as HTMLInputElement).value;
    this.projeto.descricao = (document.getElementById('areaInteresse') as HTMLInputElement).value;
    this.projeto.areaInteresse = (document.getElementById('descricaoProjeto') as HTMLInputElement).value;
    this.projeto.alunos = this.alunos;
    this.projeto.professor = this.professor;

    this.projetoService.atualizarProjeto(this.id, this.projeto);
    this.router.navigate(['/repositorio-de-projetos', { id: this.idSession, tipoUsuario: this.tipoSession}]);
  }

}
