import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Aluno } from 'src/app/shared/aluno/aluno';
import { Professor } from 'src/app/shared/professor/professor';
import { Ideia } from 'src/app/shared/ideia/ideia';
import { IdeiaService } from 'src/app/shared/ideia/ideia.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-ideia',
  templateUrl: './cadastrar-ideia.component.html',
  styleUrls: ['./cadastrar-ideia.component.css']
})

export class CadastrarIdeiaComponent implements OnInit {

  ideia: Ideia = new Ideia();
  aluno: Aluno = new Aluno();
  professor: Professor = new Professor()
  returnIdeia: Ideia = new Ideia();
  idUsuario: any = '';  

  formulario = new FormGroup({
    tituloIdeia: new FormControl(''),
    areaInteresse: new FormControl(''),
    descricaoIdeia: new FormControl(''),
  });

  constructor(
    private ideiaService: IdeiaService,
    private route_rec: ActivatedRoute,
    private router_env: Router
  ) { }

  ngOnInit(): void {
    this.idUsuario = this.route_rec.snapshot.paramMap.get('id');
  }

  onSubmit() {
    this.formIdeia();
  }

  formIdeia() {
    this.aluno.id = this.idUsuario;
    this.ideia.titulo = this.formulario.get("tituloIdeia")?.value;
    this.ideia.areaInteresse = this.formulario.get("areaInteresse")?.value;
    this.ideia.descricao = this.formulario.get("descricaoIdeia")?.value;
    this.ideia.aluno = this.aluno
    console.log(this.ideia)
    console.log(this.aluno)
    this.ideiaService.salvaIdeia(this.ideia).subscribe(ideia => {
      this.returnIdeia = new Ideia(ideia);
      this.router_env.navigate([`/ideia/${ideia.id}`])
      console.log(this.returnIdeia);
    });
  }

}
