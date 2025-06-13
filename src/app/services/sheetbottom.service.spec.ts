import { TestBed } from '@angular/core/testing';

import { SheetbottomService } from './sheetbottom.service';

describe('SheetbottomService', () => {
  let service: SheetbottomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetbottomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
