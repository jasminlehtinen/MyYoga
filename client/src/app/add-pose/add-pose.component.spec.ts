import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPoseComponent } from './add-pose.component';

describe('AddPoseComponent', () => {
  let component: AddPoseComponent;
  let fixture: ComponentFixture<AddPoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPoseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
