import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorioDeProjetosComponent } from './repositorio-de-projetos.component';

describe('RepositorioDeProjetosComponent', () => {
  let component: RepositorioDeProjetosComponent;
  let fixture: ComponentFixture<RepositorioDeProjetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositorioDeProjetosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorioDeProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
