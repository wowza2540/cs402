import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MymodalhomeComponent } from './mymodalhome.component';

describe('MymodalhomeComponent', () => {
  let component: MymodalhomeComponent;
  let fixture: ComponentFixture<MymodalhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MymodalhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MymodalhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
