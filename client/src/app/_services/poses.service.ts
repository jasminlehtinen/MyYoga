import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { IPoses } from '../poses'
import { TokenStorageService } from './token-storage.service'

@Injectable({
  providedIn: 'root'
})
export class PosesService {

  private _url: string = 'http://localhost:3001/api/'

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getPoses(): Observable<IPoses[]> {
    let user = this.tokenStorage.getUser()

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.token}`,
        'user_email': `${user.email}`
      })
    }

    return this.http.get<IPoses[]>(this._url + 'poses', httpOptions)
                    .pipe(catchError(this.errorHandler))
  }

  getPoseById(id): Observable<IPoses[]> {
    let user = this.tokenStorage.getUser()

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.token}`,
        'user_email': `${user.email}`
      })
    }

    return this.http.get<IPoses[]>(this._url + 'poses' + '/' + id, httpOptions)
                    .pipe(catchError(this.errorHandler))
  }

  addPose(pose): Observable<IPoses[]> {
    let user = this.tokenStorage.getUser()

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.token}`
      })
    }

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

  updatePose(id, pose): Observable<IPoses[]> {
    let user = this.tokenStorage.getUser()

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.token}`,
        'user_email': `${user.email}`
      }),
    } 

    return this.http.put<IPoses[]>(this._url + 'poses' + '/' + id, {
                      englishname: pose.englishname,
                      sanskritname: pose.sanskritname,
                      type: pose.type,
                      difficulty: pose.difficulty,
                      link: pose.link
                    }, httpOptions)
                    .pipe(catchError(this.errorHandler))
  }

  deletePose(id): Observable<IPoses[]> {
    let user = this.tokenStorage.getUser()

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.token}`
      }),
    }

    return this.http.delete<IPoses[]>(this._url + 'poses' + '/' + id, httpOptions)
                    .pipe(catchError(this.errorHandler))

  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error')
  }
}
