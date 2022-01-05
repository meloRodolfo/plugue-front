import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarIdeiaComponent } from './pages/cadastrar-ideia/cadastrar-ideia.component';
import { AtualizarIdeiaComponent } from './pages/atualizar-ideia/atualizar-ideia.component';
import { IdeiaComponent } from './pages/ideia/ideia.component';
import { RepositorioDeIdeiasComponent } from './pages/repositorio-de-ideias/repositorio-de-ideias.component';
import { IndexComponent } from './pages/index/index.component';
import { ProjetoComponent } from './pages/projeto/projeto.component';
import { AtualizarProjetoComponent } from './pages/atualizar-projeto/atualizar-projeto.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    CadastroComponent,
    LoginComponent,
    CadastrarIdeiaComponent,
    AtualizarIdeiaComponent,
    IdeiaComponent,
    RepositorioDeIdeiasComponent,
    IndexComponent,
    ProjetoComponent,
    AtualizarProjetoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
