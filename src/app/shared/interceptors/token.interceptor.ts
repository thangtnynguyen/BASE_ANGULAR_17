import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.GetToken();
  const reqClone = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(reqClone).pipe(
    catchError((err) => {
      if (err.status === 401) {
        const refreshToken = authService.GetRefreshToken();
        authService.refreshToken({ token, refreshToken }).pipe(
          switchMap((res) => {
            authService.SetToken(res.token);
            authService.SetRefreshToken(res.refreshToken);
            const reqClone = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.token}`,
              },
            });
            return next(reqClone);
          }),
          catchError((_) => {
            authService.logout();
            return next(req);
          })
        );
      }
      throw err;
    })
  );
};
