import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPacientesAgendaComponent } from './lista-pacientes-agenda.component';

describe('ListaPacientesAgendaComponent', () => {
  let component: ListaPacientesAgendaComponent;
  let fixture: ComponentFixture<ListaPacientesAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaPacientesAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPacientesAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
