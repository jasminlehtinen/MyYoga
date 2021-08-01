import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySinglePoseComponent } from './display-single-pose.component';

describe('DisplaySinglePoseComponent', () => {
  let component: DisplaySinglePoseComponent;
  let fixture: ComponentFixture<DisplaySinglePoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaySinglePoseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySinglePoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
