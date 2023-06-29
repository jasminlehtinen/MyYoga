import { Component, OnInit } from '@angular/core'
import { TokenStorageService } from './services/token-storage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Yoga'

  // By default, returns false when no one has logged in 
  isLoggedIn = false
  email: string

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    // Checks if there is a valid token
    this.isLoggedIn = !!this.tokenStorageService.getToken()

    // When there's a valid token, user information is retrieved
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser()
      this.email = user.email
    }
  }

  logout(): void {
    this.tokenStorageService.signOut()
    window.location.reload()
  }
}
