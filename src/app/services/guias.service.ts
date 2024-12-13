import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Root } from '../entity/Root';
import { Observable } from 'rxjs';
import { LocalStorageService } from './util/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GuiasService {
  private apiUrl = 'http://localhost:8091'; // URL of the API

  constructor(private http: HttpClient) {}

  /*getManifiestos(page: number, size: number,agencia:string,fecha:string): Observable<Root> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('agencia',agencia)
      .set('fecha', fecha.toString());

    return this.http.get<Root>(`${this.apiUrl}/manifiestos`, { params }).pipe();
  }*/

  getGuiaRemision(
    page: number,
    size: number,
    idmanifiesto: number
  ): Observable<Root> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('nro', idmanifiesto);
    return this.http
      .get<Root>(`${this.apiUrl}/guiabymanifiesto/${idmanifiesto}`)
      .pipe();
  }
  
}
