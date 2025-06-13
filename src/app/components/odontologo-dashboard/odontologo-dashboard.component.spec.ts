import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontologoDashboardComponent } from './odontologo-dashboard.component';

describe('OdontologoDashboardComponent', () => {
  let component: OdontologoDashboardComponent;
  let fixture: ComponentFixture<OdontologoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OdontologoDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdontologoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
