import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { PosesService } from '../../services/poses.service'
import { ILevels } from '../../interfaces/levels'

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit, OnDestroy {

  // Conditionally render the form, either adding a new pose or updating an existing one
  @Input() isAdd: boolean // Value received by the Profile-View component
  @Input() isUpdate: boolean // Value received by the ??

  // Subscriptions to addPose and updatePose API calls
  private addPoseSub: Subscription
  private updatePoseSub: Subscription

  form: any = {} // Empty object to store the user submitted form data in
  id: any // ID of an existing pose
  isSuccessful = false // Boolean value to prevent the user from submitting the same form, if it was already successfully submitted
  submitFailed = false // Boolean value to track whether the form submission failed or not
  errorMessage = '' // Displays an error message, if there was an error with the form submission

  levels: ILevels[] = [
    {value: 'beginner', viewValue: 'Beginner'},
    {value: 'intermediate', viewValue: 'Intermediate'},
    {value: 'advanced', viewValue: 'Advanced'}
  ]

  constructor(private route: ActivatedRoute, private posesService: PosesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') // Get the ID of the pose the user is updating
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscriptions
    if (this.addPoseSub) {
      this.addPoseSub.unsubscribe()
    }
    if (this.updatePoseSub) {
      this.updatePoseSub.unsubscribe()
    }
  }

  // Reloads the page when the form has been submitted
  reloadPage(): void {
    window.location.reload()
  }

  onSubmit(): void {
    // If user is adding a new pose, subscribes to addPose method in the PosesService
    if(this.isAdd) {
      this.addPoseSub = this.posesService.addPose(this.form)
      .subscribe(
        data => {
          console.log(data)
          this.isSuccessful = true
          this.submitFailed = false
          this.reloadPage()
        },
        err => {
          this.errorMessage = err.errorMessage
          this.submitFailed = true
        }
      )
    }

    // If user is updating an existing pose, subscribes to updatePose method in the PosesService
    if(this.isUpdate) {
      this.updatePoseSub = this.posesService.updatePose(this.id, this.form)
      .subscribe(
        data => { 
          console.log(data)
          console.log(this.id)
          console.log(this.form)
          this.isSuccessful = true
          this.submitFailed = false
          this.reloadPage()
        },
        err => {
          this.errorMessage = err.errorMessage
          this.submitFailed = true
        }
      )
    }
  }
}
