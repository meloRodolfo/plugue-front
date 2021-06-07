import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Aluno } from 'src/app/shared/aluno/aluno';
import { Professor } from 'src/app/shared/professor/professor';
import { ProfessorService } from 'src/app/shared/professor/professor.service';
import { AlunoService } from 'src/app/shared/aluno/aluno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  professor: Professor = new Professor();
  returnProf: Professor = new Professor();
  aluno: Aluno = new Aluno();
  returnAluno: Aluno = new Aluno();
  isAluno: boolean = false;
  isProfessor: boolean = true;

  formulario = new FormGroup({
    nome: new FormControl(''),
    paginaPessoal: new FormControl(''),
    curso: new FormControl(''),
    email: new FormControl(''),
    senha : new FormControl(''),
  });

  constructor(
    private professorService: ProfessorService,
    private alunoService: AlunoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  changeUserType() {
    this.isAluno = !this.isAluno;
    this.isProfessor = !this.isProfessor;
    console.log(this.isAluno, this.isProfessor)
  }

  onSubmit() {
    this.isProfessor == true ? this.formProfessor() : this.formAluno();
  }

  formAluno() {
    this.aluno.nome = this.formulario.get("nome")?.value;
    this.aluno.curso = this.formulario.get("curso")?.value;
    this.aluno.contato = this.formulario.get("email")?.value;
    this.aluno.senha = this.formulario.get("senha")?.value;
    this.aluno.tipoUsuario = 'aluno';
    this.alunoService.salvaAluno(this.aluno).subscribe(al => {
      this.returnAluno = new Aluno(al);
      console.log(this.returnAluno);
      if(this.returnAluno!=null){
        this.router.navigate(['/home', { id: al.id, tipoUsuario: this.aluno.tipoUsuario}])
      }
    })
  }

  formProfessor() {
    this.professor.nome = this.formulario.get('nome')?.value;
    this.professor.paginaPessoal = this.formulario.get("paginaPessoal")?.value;
    this.professor.contato = this.formulario.get("email")?.value;
    this.professor.senha = this.formulario.get("senha")?.value;
    this.professor.tipoUsuario = 'professor';

    this.professorService.salvaProfessor(this.professor).subscribe(prof => {
      this.returnProf = new Professor(prof);
      console.log(this.returnProf);
      if(this.returnProf!=null){
        this.router.navigate(['/home', { id: prof.id, tipoUsuario: this.professor.tipoUsuario}])
      }
    });
  }

}
