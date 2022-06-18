import { TestBed } from '@angular/core/testing';

import { SDepartmentService } from './sdepartment.service';

describe('SDepartmentService', () => {
  let service: SDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
