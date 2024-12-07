import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import environment from "environments/environment";
import { User } from "@interfaces/user.interface";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private appUrl: string = environment.appUrl
  public redirectUrl!: string
  constructor(private _http: HttpClient, private router: Router) { }

  public login(body: { [key: string]: string | number }): Observable<any> {
    return this._http.post(`${this.appUrl}/login`, body).pipe(tap((res: any) => {
      localStorage.setItem('token', res['token'])
      localStorage.setItem('user', JSON.stringify(res.user))
    }))
  }

  public logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.router.navigateByUrl('/pages/login')
  }

  public getUser(): User | null {
    const user: string | null = localStorage.getItem('user')
    if (user) return JSON.parse(user)
    return null
  }

  public getToken = (): string | null => localStorage.getItem('token')

  public isAuthenticated = (): boolean => !!localStorage.getItem('token')
}
