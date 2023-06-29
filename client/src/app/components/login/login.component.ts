import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { TokenStorageService } from '../../services/token-storage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  // Subscription to login API call
  private loginSub: Subscription

  userForm: FormGroup // Creates an instance of the FormGroup
  //form: any = {} // Empty object to store the user submitted form data in
  isLoggedIn = false // Boolean value to track the user's login status
  isLoginFailed = false // Boolean value to track whether the login attempt has failed or not
  errorMessage = '' // Displays an error message, if there was an error with the login

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    // Checks if there's an existing token in the browser's session storage, i.e. user has already logged in
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true
    }

    // Initializes the login form with two form controls: email and password
    this.userForm = this.fb.group({
      // Both have the initial value of an empty string and are required
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription
    if (this.loginSub) {
      this.loginSub.unsubscribe()
    }
  }

  // Getter method to provide access to the email form control
  get email() {
    return this.userForm.get('email')
  }

  // Getter method to provide access to the password form control
  get password() {
    return this.userForm.get('password')
  }

  onSubmit(): void {
    // Subscribes to login method in the AuthService
    this.loginSub = this.authService.login(this.userForm.value)
      .subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken)
          this.tokenStorage.saveUser(data)

          this.isLoginFailed = false
          this.isLoggedIn = true
          this.router.navigate(['/poses'])
        },
        err => {
          this.errorMessage = err.error.message
          this.isLoginFailed = true
        }
      )
  }
}
