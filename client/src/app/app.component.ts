import { Component, OnInit } from '@angular/core'
import { TokenStorageService } from './services/token-storage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Yoga'

  isLoggedIn = false // By default, returns false when no one has logged in 
  email = '' // Empty value where the fetched user email is assigned to

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    // Checks if there is a valid token
    this.isLoggedIn = !!this.tokenStorage.getToken()

    // When there's a valid token, user information is retrieved
    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser()
      this.email = user.email
    }
  }

  logout(): void {
    this.tokenStorage.signOut() // Invokes the signOut method in TokenStorage service
    window.location.reload() // Reloads the page
  }
}
