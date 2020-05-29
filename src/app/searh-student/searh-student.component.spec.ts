import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearhStudentComponent } from './searh-student.component';

describe('SearhStudentComponent', () => {
  let component: SearhStudentComponent;
  let fixture: ComponentFixture<SearhStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearhStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearhStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
