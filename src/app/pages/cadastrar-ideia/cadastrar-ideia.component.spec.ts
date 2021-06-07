import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarIdeiaComponent } from './cadastrar-ideia.component';

describe('CadastrarIdeiaComponent', () => {
  let component: CadastrarIdeiaComponent;
  let fixture: ComponentFixture<CadastrarIdeiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarIdeiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarIdeiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
