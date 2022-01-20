import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeiaService } from 'src/app/shared/ideia/ideia.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Projeto } from 'src/app/shared/projeto/projeto';
import { ProjetoService } from 'src/app/shared/projeto/projeto.service';
import { UserService } from 'src/app/shared/user/user.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../assets/stylesheets/dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ideias!: Array<any>;
  minhasIdeias!: Array<any>;
  ideiasDeInteresse!: Array<any>;
  // projetos!: Array<Projeto>;
  idUsuario: any = '';
  flag: boolean = false;
  qtdIdeiasInteresse: number = 0;
  qtdMinhasIdeias: number = 0;
  msgModal: string = '';
  flagModal: boolean = false;

  formularioBusca = new FormGroup({
    titulo: new FormControl(''),
    criador: new FormControl(''),
    area: new FormControl(''),
    autor: new FormControl('')
  })

  constructor(
    private route: ActivatedRoute,
    private ideiaService: IdeiaService,
    // private projetoService: ProjetoService,
    private usuarioService: UserService
  ) {
    this.idUsuario = this.route.snapshot.paramMap.get('id');
    sessionStorage.setItem('id', this.idUsuario);
   }

  ngOnInit(): void {
    this.ideias;
    this.minhasIdeias;
    this.ideiasDeInteresse;
    this.listaIdeias();
    this.listaInteresse();
  }

  listaIdeias() {
    this.ideiaService.listarIdeias(this.idUsuario).subscribe((ideias) => {
      const objectArray = Object.entries(ideias);
      objectArray.forEach(([key, value]) => {
        if(key === 'interestingIdeas') this.ideias = value;
        if(key === 'myIdeas') this.minhasIdeias = value;
      })
      if(!this.ideias) this.flag = true;
      this.minhasIdeias ? this.qtdMinhasIdeias = this.minhasIdeias.length : 0;
      console.log(this.minhasIdeias, "##");
    });
  }

  listaInteresse() {
    this.usuarioService.getInterestingIdeas(this.idUsuario).then(({ idea }) => {
      this.ideiasDeInteresse = idea
    })
    this.ideiasDeInteresse ? this.qtdIdeiasInteresse = this.ideiasDeInteresse.length : 0;
  }

  // listaProjetos() {
  //   this.projetoService.listarProjetos().then(projetos => {
  //     const objectArray = Object.entries(projetos);
  //     objectArray.forEach(([key, value]) => {
  //       this.projetos.push(value);
  //     })
  //     console.log(this.projetos);
  //   })
  // }

  buscaIdeias() {
    this.ideias = [];
    this.ideiaService.buscarIdeias(
      this.formularioBusca.get('titulo')?.value,
      this.formularioBusca.get('area')?.value, 
      this.formularioBusca.get('autor')?.value,
      this.idUsuario
    ).then(ideias => {
        const objectArray = Object.entries(ideias);
        objectArray.forEach(([key, value]) => {
          if(key === 'interestingIdeas') this.ideias = value;
          if(key === 'myIdeas') this.minhasIdeias = value;
        })
      });
  }

  // buscaProjetos() {
  //   this.projetos = [];
  //   this.projetoService.buscarProjetos(this.formularioBusca.get('titulo')?.value,
  //     this.formularioBusca.get('area')?.value).then(projetos => {
  //       const objectArray = Object.entries(projetos);
  //       objectArray.forEach(([key, value]) => {
  //         this.projetos.push(value);
  //       })
  //       console.log(this.projetos)
  //     });
  // }

  interessaIdeia(idIdeia: String) {
    this.usuarioService.applyIdea(this.idUsuario, idIdeia).then(response => {
        this.msgModal = response.message;
        this.showModal();
        console.log("Interesse efetuado com sucesso", response);
      },
      error => {
          console.log("Erro na hora de interessar-se por ideia", error);
      }
    );
  }

  showModal() {
    this.flagModal = true;
  }

  closeModal() {
    this.flagModal = false;
  }
}