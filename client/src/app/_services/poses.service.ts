import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { TokenStorageService } from './token-storage.service'
import { IPoses } from '../poses'

@Injectable({
  providedIn: 'root'
})
export class PosesService {

  private _url: string = 'http://localhost:3001/api/'

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  // Get all user's saved poses
  getPoses(): Observable<IPoses[]> {
    let user = this.tokenStorage.getUser() // Get the current user

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.token}`,
        'user_email': `${user.email}`
      })
    }

    // Sends a GET request with the current user's information and authorization to retrieve user's saved poses
    return this.http.get<IPoses[]>(this._url + 'poses', httpOptions)
                    .pipe(catchError(this.errorHandler))
  }

  // Get a specific pose with an ID
  getPoseById(id): Observable<IPoses[]> {
    let user = this.tokenStorage.getUser() // Get the current user

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.token}`,
        'user_email': `${user.email}`
      })
    }

    // Sends a GET request with the current user's information and authorization to retrieve a specific pose that the user has saved
    return this.http.get<IPoses[]>(this._url + 'poses' + '/' + id, httpOptions)
                    .pipe(catchError(this.errorHandler))
  }

  // Add a new pose
  addPose(pose): Observable<IPoses[]> {
    let user = this.tokenStorage.getUser() // Get the current user

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.token}`
      })
    }

    // Sends a POST request with the new pose and necessary user information and authorization
    return this.http.post<IPoses[]>(this._url + 'poses', {
                      englishname: pose.englishname,
                      sanskritname: pose.sanskritname,
                      type: pose.type,
                      difficulty: pose.difficulty,
                      link: pose.link,
                      user_email: user.email
                    }, httpOptions)
                    .pipe(catchError(this.errorHandler))
  }

  // Send the user's updated pose
  updatePose(id, pose): Observable<IPoses[]> {
    let user = this.tokenStorage.getUser() // Get the current user

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.token}`,
        'user_email': `${user.email}`
      }),
    } 

    // Sends a PUT request with the new pose data for a specific ID and user authorization
    return this.http.put<IPoses[]>(this._url + 'poses' + '/' + id, {
                      englishname: pose.englishname,
                      sanskritname: pose.sanskritname,
                      type: pose.type,
                      difficulty: pose.difficulty,
                      link: pose.link
                    }, httpOptions)
                    .pipe(catchError(this.errorHandler))
  }

  // Delete a pose
  deletePose(id): Observable<IPoses[]> {
    let user = this.tokenStorage.getUser() // Get the current user

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.token}`
      }),
    }

    // Sends a DELETE request with the specific ID and user authorization
    return this.http.delete<IPoses[]>(this._url + 'poses' + '/' + id, httpOptions)
                    .pipe(catchError(this.errorHandler))

  }

  // Handles the error message, if there's an error with any of the requests
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error')
  }
}
