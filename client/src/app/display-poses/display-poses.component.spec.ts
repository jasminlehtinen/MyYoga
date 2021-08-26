import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayPosesComponent } from './display-poses.component'

describe('PosesComponent', () => {
  let component: DisplayPosesComponent
  let fixture: ComponentFixture<DisplayPosesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPosesComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPosesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
