import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

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
      // Returns a new array containing values that match the email parameter
      map((emails: Array<any>) =>
        emails.filter(emails => emails.email === email),
      ),
      // Checks if the previously filtered array is empty or not
      // If the filtered array is empty, the user doesn't exist
      map(emails => !emails.length)
    )
  }
}
