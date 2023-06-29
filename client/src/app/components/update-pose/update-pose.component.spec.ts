import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { UpdatePoseComponent } from './update-pose.component'

describe('UpdatePoseComponent', () => {
  let component: UpdatePoseComponent
  let fixture: ComponentFixture<UpdatePoseComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePoseComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePoseComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
