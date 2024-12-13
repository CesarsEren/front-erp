import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Root } from '../entity/Root';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncomiendasService {

  private apiUrl = 'http://localhost:8091'; // URL of the API

  constructor(private http: HttpClient) {}

  getEncomiendas(page: number, size: number,ID:number): Observable<Root> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('ID',ID)

    return this.http.get<Root>(`${this.apiUrl}/encomiendas`, { params }).pipe();
  }
}
