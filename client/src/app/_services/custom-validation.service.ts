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

  // Check the db if an user with the same email already exists
  checkEmail(email: string): Observable<boolean> {
    return this.http.get(AUTH_API + 'users', httpOptions).pipe(
      map((emails: Array<any>) =>
        emails.filter(emails => emails.email === email),
      ),
      map(emails => !emails.length)
    )
  }
}
