import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Root } from '../../entity/Root';
import { Token } from '../../entity/Token';
import { LocalStorageService } from '../util/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8091'; // URL of the API
  private out_data = 'loginData';
  private bearerToken = 'bearer';

  constructor(private http: HttpClient, private localStorageService:LocalStorageService) {}

  // Login method to generate token
  login(username: string, password: string): Observable<Root> {
    return this.http
      .post<Root>(`${this.apiUrl}/credenciales`, {
        in_usuario: username,
        in_clave: password,
      })
      .pipe(
        tap((response) => {
          // Save the tokens in localStorage or sessionStorage
          this.saveTokens(response);
        })
      );
  }

  // Save token and refresh token in localStorage
  private saveTokens(response: Root): void {
    this.localStorageService.setItem(this.out_data, JSON.stringify(response.out_data));
    this.localStorageService.setItem(
      this.bearerToken,
      (response.out_data as Token).out_token
    );
  }

  // Retrieve the token from localStorage
  getToken(): string | null {
    return this.localStorageService.getItem(this.bearerToken);
  }

  // Logout method to clear the tokens
  logout(): void {
    this.localStorageService.clear();
    // this.localStorageService.removeItem(this.out_data);
   // this.localStorageService.removeItem(this.bearerToken);
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
