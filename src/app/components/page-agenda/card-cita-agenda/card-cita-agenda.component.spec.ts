import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCitaAgendaComponent } from './card-cita-agenda.component';

describe('CardCitaAgendaComponent', () => {
  let component: CardCitaAgendaComponent;
  let fixture: ComponentFixture<CardCitaAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardCitaAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCitaAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
