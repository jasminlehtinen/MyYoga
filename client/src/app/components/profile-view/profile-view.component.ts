import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TokenStorageService } from '../../services/token-storage.service'

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  user: any // Assign the retrieved user data
  tabIndex = 0 // Default value for the tabIndex
  isAdd = true // Determines that the Form-Control component should display "Add new" form

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    // Retrieves the user data by calling the getUser method in the TokenStorage
    this.user = this.tokenStorage.getUser()
  }

  // If the tabIndex is 0, displays the Display-Poses component
  // If the tabIndex is 1, displays the Form-Control component
  onTabClick(index) {
    this.tabIndex = index
  }

  // Calls the signOut method in the TokenStorage to sign out the user and then redirects to the home page
  toLogout() {
    this.user = this.tokenStorage.signOut()
    this.router.navigate([''])
  }
}
