import { Injectable } from '@angular/core'

// Keys to store data in the browser's session storage
const TOKEN_KEY = 'auth-token'
const USER_KEY = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  // Clears the session storage when the user logs out
  signOut(): void {
    window.sessionStorage.clear()
  }

  // Save the token in the session storage by removing any previous tokens and setting a new one
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.setItem(TOKEN_KEY, token)
  }

  // Get an active token from the session storage
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)
  }

  // Saves the user as a string in the session storage by removing any previous ones and setting a new one
  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  // Gets the user from the session storage and returns it as a parsed JSON object
  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY))
  }
}
