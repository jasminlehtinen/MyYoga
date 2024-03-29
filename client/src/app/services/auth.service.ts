import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const AUTH_API = 'http://localhost:3001/api/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Sends a POST request to authenticate the user's credentials
  login(credentials): Observable<any> {
    return this.http.post(`${AUTH_API}login`, {
      email: credentials.email,
      password: credentials.password
    }, httpOptions)
  }

  // Sends a POST request to create a new user with the user information
  register(user): Observable<any> {
    return this.http.post(`${AUTH_API}signup`, {
      email: user.email,
      password: user.password
    }, httpOptions)
  }
}
