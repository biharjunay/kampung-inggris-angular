import { HttpClient, HttpParams } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { Response } from "../interfaces/interface";
import env from "environments/environment";

export abstract class BaseService<T, B = { [key: string]: any }> {
  protected abstract endpoint: string
  protected appUrl: string
  protected http: HttpClient

  constructor() {
    this.appUrl = env.appUrl
    this.http = inject(HttpClient)
  }

  private buildParams = (params?: { [key: string]: any }): HttpParams =>
    params ? Object.keys(params).reduce((acc: HttpParams, key: string): HttpParams =>
      params[key] ? acc.set(key, params[key]) : acc, new HttpParams()) : new HttpParams()

  public getData = (filter?: { [key: string]: any }): Observable<Response<T>> =>
    this.http.get<Response<T>>(`${this.appUrl}/${this.endpoint}`, { params: this.buildParams(filter) })

  public getDetail = (id: string | number, params?: { [key: string]: any }): Observable<Response<T>> =>
    this.http.get<Response<T>>(`${this.appUrl}/${this.endpoint}/${id}`, { params: this.buildParams(params) })

  public save = (body?: B): Observable<Response<T>> =>
    this.http.post<Response<T>>(`${this.appUrl}/${this.endpoint}`, body)

  public update = (id: string | number, body?: B): Observable<Response<T>> =>
    this.http.put<Response<T>>(`${this.appUrl}/${this.endpoint}/${id}`, body)

  public delete = (id: string | number): Observable<Response<any>> =>
    this.http.delete<Response<any>>(`${this.appUrl}/${this.endpoint}/${id}`)
}
