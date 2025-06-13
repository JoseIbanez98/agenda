import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../Environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.auth.accessToken;
    
    let request = req;
    if (accessToken) {
      console.log('hola2')
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.auth.refreshToken) {
         console.log('hola')
          // Intentar refrescar
          
          // return this.auth.refreshAccessToken().pipe( 
          //   switchMap((newToken) => {
          //     const retryReq = req.clone({
          //       setHeaders: {
          //         Authorization: `Bearer ${newToken}`,
          //         API_KEY: environment.API_KEY, 
          //       },
                
          //     });
          //     return next.handle(retryReq);
              
          //   }),
          //   catchError((refreshError) => {
          //     this.auth.logout();
          //     return throwError(() => refreshError);
          //   })
          // );
        }
        return throwError(() => error);
      })
    );
  }
}
