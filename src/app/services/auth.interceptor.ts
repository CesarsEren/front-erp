import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './util/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Here you can add your token from localStorage or any other logic
    const token = this.localStorageService.getItem('bearer');

    if (token) {
      // Clone the request to add the new Authorization header
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Pass the cloned request instead of the original request to the next handler
      return next.handle(clonedRequest);
    }

    // If no token, pass the original request
    return next.handle(req);
  }
}
