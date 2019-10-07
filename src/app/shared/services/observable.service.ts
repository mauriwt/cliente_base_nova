
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ObservableService {

  private headers: HttpHeaders = new HttpHeaders();

  private credentials = true;
  constructor(private http: HttpClient) {
    this.setHeaders("");
  }

  public setHeaders(token) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    //this.headers = this.headers.append('Authorization', `Bearer ${token}`);
  }

  public getUrlServicioGet(servicio: string) {
    return this.getQuery(servicio);
  }

  getQuery(query: string) {
    return this.http.get(query, { headers: this.headers });
  }


  /* public getUrlServicioPost(servicio: string, obj) {
    return this.http.post(servicio, obj, {
      headers: this.headers
    }).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
  } */
  post(servicio: string, obj): Observable<any> {
    return this.http.post(servicio, obj, { headers: this.headers }).pipe(
      tap((body) => body),
      catchError(this.handleError<any>('Error al guardar registro'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
