import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Root } from '../entity/Root';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionService {


  private apiUrl = 'http://localhost:8091'; // URL of the API

  constructor(private http: HttpClient) {}

  getConductores(ID:number): Observable<Root> {
    const params = new HttpParams()
      .set('ID',ID)

    return this.http.get<Root>(`${this.apiUrl}/programacion`, { params }).pipe();
  }
}
