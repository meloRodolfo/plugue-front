import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ideia } from 'src/app/shared/ideia/ideia';
import { IdeiaService } from 'src/app/shared/ideia/ideia.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Projeto } from 'src/app/shared/projeto/projeto';
import { ProjetoService } from 'src/app/shared/projeto/projeto.service';
import { ProfessorService } from 'src/app/shared/professor/professor.service';
import { AlunoService } from 'src/app/shared/aluno/aluno.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../assets/stylesheets/dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ideias!: Array<Ideia>;
  projetos!: Array<Projeto>;
  tipoUsuario: any = '';
  idUsuario: any = '';
  isAluno: boolean = false;
  isProfessor: boolean = false;

  formularioBusca = new FormGroup({
    titulo: new FormControl(''),
    criador: new FormControl(''),
    area: new FormControl('')
  })

  constructor(
    private route: ActivatedRoute,
    private ideiaService: IdeiaService,
    private projetoService: ProjetoService,
    private professorService: ProfessorService,
    private alunoService: AlunoService
  ) {
    this.idUsuario = this.route.snapshot.paramMap.get('id');
    this.tipoUsuario = this.route.snapshot.paramMap.get('tipoUsuario');
    sessionStorage.setItem('id', this.idUsuario);
    sessionStorage.setItem('tipo', this.tipoUsuario);
   }

  ngOnInit(): void {
    this.checkUserType();
    this.ideias = [];
    this.projetos = [];
  }

  checkUserType() {
    if (this.tipoUsuario == 'aluno') {
      this.isAluno = true;
      this.listaProjetos();
    } else if (this.tipoUsuario == 'professor') {
      this.isProfessor = true;
      this.listaIdeias();
    }
  }

  listaIdeias() {
    this.ideiaService.listarIdeias().subscribe(ideias => {
      ideias.forEach(i => {
        this.ideias.push(i)
      });
    });
  }

  listaProjetos() {
    this.projetoService.listarProjetos().then(projetos => {
      const objectArray = Object.entries(projetos);
      objectArray.forEach(([key, value]) => {
        this.projetos.push(value);
      })
      console.log(this.projetos);
    })
  }

  buscaPorParametros() {
    if (this.isAluno) this.buscaProjetos();
    if (this.isProfessor) this.buscaIdeias();
  }

  buscaIdeias() {
    this.ideias = [];
    this.ideiaService.buscarIdeias(this.formularioBusca.get('titulo')?.value,
      this.formularioBusca.get('area')?.value).then(ideias => {
        const objectArray = Object.entries(ideias);
        objectArray.forEach(([key, value]) => {
          this.ideias.push(value);
        })
        console.log(this.ideias);
      });
  }

  buscaProjetos() {
    this.projetos = [];
    this.projetoService.buscarProjetos(this.formularioBusca.get('titulo')?.value,
      this.formularioBusca.get('area')?.value).then(projetos => {
        const objectArray = Object.entries(projetos);
        objectArray.forEach(([key, value]) => {
          this.projetos.push(value);
        })
        console.log(this.projetos)
      });
  }

  interessaIdeia(idIdeia: Number) {
    this.professorService.applyIdea(this.idUsuario, idIdeia);
  }

  interessaProjeto(idProjeto: Number) {
    this.alunoService.applyIdea(this.idUsuario, idProjeto);
  }
}