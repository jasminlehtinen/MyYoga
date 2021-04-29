import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../_services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {}
  isSuccessful = false
  signUpFailed = false
  errorMessage = ''

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.authService.register(this.form)
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
