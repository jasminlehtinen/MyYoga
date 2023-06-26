import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../_services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  // Subscription to register API call
  private registerSub: Subscription

  userForm: FormGroup // Creates an instance of the FormGroup
  isSuccessful = false // Boolean value to prevent the user from submitting the same form, if the registration was already successful
  signUpFailed = false // Boolean value to track whether the registration failed or not
  errorMessage = '' // Displays an error message, if there was an error with the registration

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // Initializes the register form with two form controls: email and password
    this.userForm = this.fb.group({
      // Both have the initial value of an empty string and are required
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription
    if (this.registerSub) {
      this.registerSub.unsubscribe()
    }
  }

  // Getter method to provide acceess to the email form control
  get email() {
    return this.userForm.get('email')
  }

  // Getter method to provide acceess to the password form control
  get password() {
    return this.userForm.get('password')
  }

  onSubmit(): void {
    // Subscribes to register method in the AuthService
    this.registerSub = this.authService.register(this.userForm.value)
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

  // Router navigates to the login page
  toLogin() {
    this.router.navigate(['/login'])
  }
}
