import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiasAgendaComponent } from './dias-agenda.component';

describe('DiasAgendaComponent', () => {
  let component: DiasAgendaComponent;
  let fixture: ComponentFixture<DiasAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiasAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiasAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
