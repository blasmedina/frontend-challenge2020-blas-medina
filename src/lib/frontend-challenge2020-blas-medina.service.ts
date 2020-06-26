import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FrontendChallenge2020BlasMedinaService {
  endpoint: string = 'https://taiga.tecnoandina.cl/api/v1';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-in
  signIn(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/auth`, { type: 'normal', ...user })
      .subscribe((res: any) => {
        const { auth_token, photo, username } = res;
        localStorage.setItem(
          'user',
          JSON.stringify({
            auth_token,
            photo,
            username,
          })
        );
        this.router.navigate(['home']);
      });
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  get isLoggedIn(): boolean {
    let user = localStorage.getItem('user');
    return user !== null ? true : false;
  }

  doLogout() {
    let user = localStorage.removeItem('user');
    if (user == null) {
      this.router.navigate(['/']);
    }
  }

  getUserStories(): Observable<any> {
    let api = `${this.endpoint}/userstories`;
    const user = this.getUser();
    if (this.isLoggedIn) {
      return this.http
        .get(api, { headers: { Authorization: `Bearer ${user.auth_token}` } })
        .pipe(
          map((res: Response) => {
            return res || [];
          }),
          catchError(this.handleError)
        );
    }
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(msg);
  }
}
