import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/shared/aluno/aluno';
import { Ideia } from '../../shared/ideia/ideia';
import { IdeiaService } from 'src/app/shared/ideia/ideia.service';

@Component({
  selector: 'app-atualizar-ideia',
  templateUrl: './atualizar-ideia.component.html',
  styleUrls: ['./atualizar-ideia.component.css']
})
export class AtualizarIdeiaComponent implements OnInit {
  readonly id: String;
  descricao: String;
  titulo: String;
  area: String;
  professores: Array<any>;
  ideia: Ideia = new Ideia();
  aluno: Aluno = new Aluno();
  idSession: any = '';
  tipoSession: any = '';

  constructor(route: ActivatedRoute,private ideiaService: IdeiaService, private router: Router) {
    this.id = route.snapshot.params.ideiaId;
    this.titulo = route.snapshot.params.titulo;
    this.descricao = route.snapshot.params.descricao;
    this.area = route.snapshot.params.area;
    this.aluno.id = route.snapshot.params.criador;
    this.professores = route.snapshot.params.interessados || []
    this.idSession = sessionStorage.getItem("id");
    this.tipoSession = sessionStorage.getItem("tipo");
  }

  ngOnInit(): void {
  }

  atualizarIdeia() {
    this.ideia.titulo = (document.getElementById('tituloIdeia') as HTMLInputElement).value;
    this.ideia.descricao = (document.getElementById('descricaoIdeia') as HTMLInputElement).value;
    this.ideia.areaInteresse = (document.getElementById('areaInteresse') as HTMLInputElement).value;
    this.ideia.professores = this.professores;
    this.ideia.aluno = this.aluno;

    this.ideiaService.atualizarIdeia(this.id, this.ideia);
    this.router.navigate(['/repositorio-de-ideias', { id: this.idSession, tipoUsuario: this.tipoSession}]);
  }
}
