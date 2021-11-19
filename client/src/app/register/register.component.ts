import { Component, OnInit } from '@angular/core'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../_services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup
  isSuccessful = false
  signUpFailed = false
  errorMessage = ''

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get email() {
    return this.userForm.get('email')
  }

  get password() {
    return this.userForm.get('password')
  }

  onSubmit(): void {
    this.authService.register(this.userForm.value)
      .subscribe(
        data => {
          console.log(data)
          this.isSuccessful = true
          this.signUpFailed = false
        },
        err => {
          this.errorMessage = err.errorMessage
          this.signUpFailed = true
        }
      )
  }

  toLogin() {
    this.router.navigate(['/login'])
  }
}
