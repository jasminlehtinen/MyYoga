import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TokenStorageService } from '../_services/token-storage.service'

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  user: any
  tabIndex = 0
  isAdd = true

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.user = this.tokenStorage.getUser()
  }

  onTabClick(index) {
    this.tabIndex = index
  }

  toLogout() {
    this.user = this.tokenStorage.signOut()
    this.router.navigate(['/home'])
  }
}
