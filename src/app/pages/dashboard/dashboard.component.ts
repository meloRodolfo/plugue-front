import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ideia } from 'src/app/shared/ideia/ideia';
import { IdeiaService } from 'src/app/shared/ideia/ideia.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Projeto } from 'src/app/shared/projeto/projeto';
import { ProjetoService } from 'src/app/shared/projeto/projeto.service';
import { ProfessorService } from 'src/app/shared/professor/professor.service';
import { AlunoService } from 'src/app/shared/aluno/aluno.service';
import { UserService } from 'src/app/shared/user/user.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../assets/stylesheets/dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ideias!: Array<any>;
  minhasIdeias!: Array<any>;
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
    private alunoService: AlunoService,
    private usuarioService: UserService
  ) {
    this.idUsuario = this.route.snapshot.paramMap.get('id');
    this.tipoUsuario = this.route.snapshot.paramMap.get('tipoUsuario');
    sessionStorage.setItem('id', this.idUsuario);
   }

  ngOnInit(): void {
    this.ideias;
    this.minhasIdeias;
    this.listaIdeias();
  }

  listaIdeias() {
    this.ideiaService.listarIdeias(this.idUsuario).subscribe((ideias) => {
      const objectArray = Object.entries(ideias);
      objectArray.forEach(([key, value]) => {
        if(key === 'interestingIdeas') this.ideias = value;
        if(key === 'myIdeas') this.minhasIdeias = value;
      })
      console.log(this.ideias);
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

  buscaIdeias() {
    this.ideias = [];
    this.ideiaService.buscarIdeias(this.formularioBusca.get('titulo')?.value,
      this.formularioBusca.get('area')?.value).then(ideias => {
        const objectArray = Object.entries(ideias);
        objectArray.forEach(([key, value]) => {
          if(key === 'interestingIdeas') this.ideias = value;
          if(key === 'myIdeas') this.minhasIdeias = value;
        })
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

  interessaIdeia(idIdeia: String) {
    console.log("cliquei")
    this.usuarioService.applyIdea(this.idUsuario, idIdeia);
  }
}