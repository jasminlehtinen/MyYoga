import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { TokenStorageService } from './token-storage.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private token: TokenStorageService, 
    private router: Router
  ) { }

  // If a valid token isn't found, the router sends the user back to login page
  canActivate(): boolean {
    if (!this.token.getToken()) {
      this.router.navigate(['login'])
      return false
    }
    return true
  }
}
