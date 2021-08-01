import { Component, OnInit } from '@angular/core';
import { PosesService } from '../_services/poses.service'

@Component({
  selector: 'app-add-pose',
  templateUrl: './add-pose.component.html',
  styleUrls: ['./add-pose.component.css']
})
export class AddPoseComponent implements OnInit {

  form: any = {}
  isSuccessful = false
  submitFailed = false
  errorMessage = ''

  constructor(private posesService: PosesService) { }

  ngOnInit() {
  }

  reloadPage(): void {
    window.location.reload();
  }

  onSubmit(): void {
    this.posesService.addPose(this.form)
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

}
