import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PosesService } from '../_services/poses.service'

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  @Input() isAdd: boolean
  @Input() isUpdate: boolean

  form: any = {}
  id: any
  isSuccessful = false
  submitFailed = false
  errorMessage = ''

  constructor(private posesService: PosesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  reloadPage(): void {
    window.location.reload()
  }

  onSubmit(): void {
    if(this.isAdd) {
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

    if(this.isUpdate) {
      this.posesService.updatePose(this.id, this.form)
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
