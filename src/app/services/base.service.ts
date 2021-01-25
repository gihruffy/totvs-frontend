import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Location } from '@angular/common';
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import  { toastr } from 'toastr';


@Injectable()
export class BaseService {
    constructor(
      private http: HttpClient) { }

    public post<T>(api: string, url: string, data: any): Observable<T> {
        return this.http
            .post<T>(this.joinEndPoint(api, url), data)
            .pipe(catchError(this.handleError), map(this.extractData));
    }

    public get<T>(api: string, url: string, params: HttpParams = new HttpParams()): Observable<T> {
        return this.http
            .get<T>(this.joinEndPoint(api, url), { params })
            .pipe(catchError(this.handleError), map(this.extractData));
    }

    public delete<T>(api: string, url: string, params: HttpParams = new HttpParams()): Observable<T> {
        return this.http
            .delete<T>(this.joinEndPoint(api, url), { params })
            .pipe(catchError(this.handleError), map(this.extractData));
    }

    public getNoParams<T>(api: string, url: string, withCredentials: boolean = true): Observable<T> {
        return this.http.get<T>(this.joinEndPoint(api, url), { withCredentials });
    }

    public put<T>(api: string, url: string, data: any): Observable<T> {
        return this.http.put<T>(this.joinEndPoint(api, url), data);
    }

    public patch<T>(api: string, url: string, data: any): Observable<T> {
        return this.http
            .patch<T>(this.joinEndPoint(api, url), data)
            .pipe(catchError(this.handleError), map(this.extractData));
    }

    private joinEndPoint(api: string, url: string): string {
        return Location.joinWithSlash(api, url);
    }

    private extractData(res: any): any {
        const body = res;
        return body || {};
    }

    private handleError(error: any): Observable<any> {
      toastr.error(error);
      console.log("ERROR =>", error);
      return throwError(error);
    }
}
