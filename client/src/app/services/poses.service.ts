import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { TokenStorageService } from './token-storage.service'
import { IPoses } from '../interfaces/poses'

@Injectable({
  providedIn: 'root'
})
export class PosesService {

  private _url: string = 'http://localhost:3001/api/'

  constructor(
    private http: HttpClient, 
    private tokenStorage: TokenStorageService
  ) { }

  // Contains the necessary HTTP headers for requests
  private getHttpOptions(): { headers: HttpHeaders } {
    const user = this.tokenStorage.getUser() // Get the current user

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.token}`,
        'user_email': `${user.email}`
      })
    }
  }

  // Handles the error message, if there's an error with any of the requests
  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error')
  }

  // Get all user's saved poses
  getPoses(): Observable<IPoses[]> {
    const httpOptions = this.getHttpOptions()

    // Sends a GET request with the current user's information and authorization to retrieve user's saved poses
    return this.http.get<IPoses[]>(this._url + 'poses', httpOptions)
                    .pipe(catchError(this.errorHandler))
  }

  // Get a specific pose with an ID
  getPoseById(id): Observable<IPoses[]> {
    const httpOptions = this.getHttpOptions()

    // Sends a GET request with the current user's information and authorization to retrieve a specific pose that the user has saved
    return this.http.get<IPoses[]>(this._url + 'poses' + '/' + id, httpOptions)
                    .pipe(catchError(this.errorHandler))
  }

  // Add a new pose
  addPose(pose): Observable<IPoses[]> {
    const httpOptions = this.getHttpOptions()
    const user = this.tokenStorage.getUser() // Get the current user to access the user email
    const requestBody = {
      englishname: pose.englishname,
      sanskritname: pose.sanskritname,
      type: pose.type,
      level: pose.level,
      link: pose.link,
      user_email: user.email
    }

    // Sends a POST request with the new pose and necessary user information and authorization
    return this.http.post<IPoses[]>(this._url + 'poses', requestBody, httpOptions)
                    .pipe(catchError(this.errorHandler))
  }

  // Send the user's updated pose
  updatePose(id, pose): Observable<IPoses[]> {
    const httpOptions = this.getHttpOptions()
    const requestBody = {
      englishname: pose.englishname,
      sanskritname: pose.sanskritname,
      type: pose.type,
      level: pose.level,
      link: pose.link
    }

    // Sends a PUT request with the new pose data for a specific ID and user authorization
    return this.http.put<IPoses[]>(this._url + 'poses' + '/' + id, requestBody, httpOptions)
                    .pipe(catchError(this.errorHandler))
  }

  // Delete a pose
  deletePose(id): Observable<IPoses[]> {
    const httpOptions = this.getHttpOptions()

    // Sends a DELETE request with the specific ID and user authorization
    return this.http.delete<IPoses[]>(this._url + 'poses' + '/' + id, httpOptions)
                    .pipe(catchError(this.errorHandler))

  }
}
