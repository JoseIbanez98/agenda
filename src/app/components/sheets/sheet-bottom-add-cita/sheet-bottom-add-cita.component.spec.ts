import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetBottomAddCitaComponent } from './sheet-bottom-add-cita.component';

describe('SheetBottomAddCitaComponent', () => {
  let component: SheetBottomAddCitaComponent;
  let fixture: ComponentFixture<SheetBottomAddCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SheetBottomAddCitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetBottomAddCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
