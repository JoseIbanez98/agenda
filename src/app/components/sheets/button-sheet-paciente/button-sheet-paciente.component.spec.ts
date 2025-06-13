import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSheetPacienteComponent } from './button-sheet-paciente.component';

describe('ButtonSheetPacienteComponent', () => {
  let component: ButtonSheetPacienteComponent;
  let fixture: ComponentFixture<ButtonSheetPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonSheetPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSheetPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
