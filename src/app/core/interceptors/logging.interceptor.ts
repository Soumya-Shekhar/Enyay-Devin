import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap, finalize } from 'rxjs';
import { environment } from '../../../environments/environment';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.production) {
    const startTime = Date.now();

    return next(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - startTime;
            console.log(
              `[HTTP] ${req.method} ${req.urlWithParams} - ${event.status} (${elapsed}ms)`
            );
          }
        },
        error: (error) => {
          const elapsed = Date.now() - startTime;
          console.error(
            `[HTTP ERROR] ${req.method} ${req.urlWithParams} - ${error.status} (${elapsed}ms)`
          );
        },
      }),
      finalize(() => {
        // Additional cleanup can be done here
      })
    );
  }

  return next(req);
};
