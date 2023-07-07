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
  public signOut(): void {
    sessionStorage.clear()
  }

  // Save the token in the session storage by removing any previous tokens and setting a new one
  public saveToken(token: string): void {
    try {
      sessionStorage.removeItem(TOKEN_KEY)
      sessionStorage.setItem(TOKEN_KEY, token)
    } catch (error) {
      console.error('Error while saving token:', error)
    }
  }

  // Get an active token from the session storage
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)
  }

  // Saves the user as a string in the session storage by removing any previous ones and setting a new one
  public saveUser(user): void {
    try {
      sessionStorage.removeItem(USER_KEY)
      sessionStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch (error) {
      console.error('Error while saving user:', error)
    }
  }

  // Gets the user from the session storage and returns it as a parsed JSON object
  public getUser(): any {
    const userString = sessionStorage.getItem(USER_KEY)

    try {
      return JSON.parse(userString)
    } catch (error) {
      console.error('Error while parsing a user:', error)
      return null
    }
  }
}
