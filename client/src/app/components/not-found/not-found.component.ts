import { Component, OnInit } from '@angular/core'
import { TokenStorageService } from 'src/app/services/token-storage.service' 

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  isLoggedIn: boolean // Boolean value to track whether the user is logged in or not

  constructor(private tokenStorage: TokenStorageService) { }

  // Checks if there's an existing token in the browser's session storage, i.e. user has logged in
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken()
  }
}
