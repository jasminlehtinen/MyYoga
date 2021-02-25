import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { IPoses } from '../poses';
import { EnvService } from './env.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PosesService {

  private _url: string = 'http://localhost:3001/api/'
  //private _url: string = this.env.apiUrl

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private env: EnvService) { }

  getPoses(): Observable<IPoses[]> {

    let user = this.tokenStorage.getUser()

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.token}`
      })
    }

    return this.http.get<IPoses[]>(this._url + 'poses', httpOptions)
                    .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error')
  }
}
