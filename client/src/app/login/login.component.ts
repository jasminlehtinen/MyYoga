import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../_services/auth.service'
import { TokenStorageService } from '../_services/token-storage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {}
  isLoggedIn = false
  isLoginFailed = false
  errorMessage = ''

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true
    }
  }

  onSubmit(): void {
    this.authService.login(this.form)
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
