import { TestBed } from '@angular/core/testing';

import { SearchStudentService } from './search-student.service';

describe('SearchStudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchStudentService = TestBed.get(SearchStudentService);
    expect(service).toBeTruthy();
  });
});
