import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialsComponent } from './editorials.component';

describe('EditorialsComponent', () => {
  let component: EditorialsComponent;
  let fixture: ComponentFixture<EditorialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
