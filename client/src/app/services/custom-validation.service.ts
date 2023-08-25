import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { map, catchError, debounceTime } from 'rxjs/operators'

const AUTH_API = 'http://localhost:3001/api/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor(private http: HttpClient) { }

  // Sends a GET request to check if a user already exists (i.e. user email found in the database)
  checkEmail(email: string): Observable<boolean> {
    return this.http.get(`${AUTH_API}users`, httpOptions).pipe(
      // Extract the user emails
      map((users: any[]) => users.map(user => user.email)),
      // Checks if the email already exists in the array
      map(emails => !emails.includes(email)),
      catchError((error) => {
        console.error('Error in checkEmail:', error)
        return throwError('Error occured while checking email availability')
      })
    )
  }
}
