import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/shared/aluno/aluno';
import { Professor } from 'src/app/shared/professor/professor';
import { Projeto } from 'src/app/shared/projeto/projeto';
import { ProjetoService } from 'src/app/shared/projeto/projeto.service';

@Component({
  selector: 'app-cadastrar-projeto',
  templateUrl: './cadastrar-projeto.component.html',
  styleUrls: ['./cadastrar-projeto.component.css']
})
export class CadastrarProjetoComponent implements OnInit {
  
  projeto: Projeto = new Projeto();
  professor: Professor = new Professor();
  idUsuario: any = ''; 

  formulario = new FormGroup({
    titulo: new FormControl(''),
    areaInteresse: new FormControl(''),
    descricao: new FormControl(''),
  });

  constructor(
    private projetoService: ProjetoService,
    private route_rec: ActivatedRoute,
    private router_env: Router
    ) {
  }

  ngOnInit(): void {
    this.idUsuario = this.route_rec.snapshot.paramMap.get('id');
  }

  formProjeto() {
    this.professor.id = Number(this.idUsuario);
    console.log(this.idUsuario)
    this.projeto.titulo = this.formulario.get("titulo")?.value;
    this.projeto.areaInteresse = this.formulario.get("areaInteresse")?.value;
    this.projeto.descricao = this.formulario.get("descricao")?.value;
    this.projeto.professor = this.professor;
    this.projetoService.salvaProjeto(this.projeto).subscribe(projeto => {
      this.router_env.navigate([`/projeto/${projeto.id}`])
    })
    
  }

}
