import { TestBed } from '@angular/core/testing';

import { ModalCourseService } from './modal-course.service';

describe('ModalCourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalCourseService = TestBed.get(ModalCourseService);
    expect(service).toBeTruthy();
  });
});
