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
    this.ideia.title = this.formulario.get("tituloIdeia")?.value;
    this.ideia.area_of_interest = this.formulario.get("areaInteresse")?.value;
    this.ideia.description = this.formulario.get("descricaoIdeia")?.value;
    this.ideia.AuthorId = this.idUsuario
    this.ideia.status = 'in progress'
    this.ideiaService.salvaIdeia(this.ideia).then((response) => {
      this.router_env.navigate([`/ideia/${response.idea}`])
    });
  }

  cancelar() {
    this.router_env.navigate(['/repositorio-de-ideias', { id: this.idUsuario }]);
  }

}
