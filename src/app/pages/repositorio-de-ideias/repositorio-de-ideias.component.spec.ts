import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorioDeIdeiasComponent } from './repositorio-de-ideias.component';

describe('RepositorioDeIdeiasComponent', () => {
  let component: RepositorioDeIdeiasComponent;
  let fixture: ComponentFixture<RepositorioDeIdeiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositorioDeIdeiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorioDeIdeiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
