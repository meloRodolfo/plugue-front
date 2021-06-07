import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarIdeiaComponent } from './atualizar-ideia.component';

describe('AtualizarIdeiaComponent', () => {
  let component: AtualizarIdeiaComponent;
  let fixture: ComponentFixture<AtualizarIdeiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarIdeiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarIdeiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
