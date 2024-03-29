import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { LoaderService } from "../services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private loadingService = inject(LoaderService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true, req.url);

    return next.handle(req).pipe(
      catchError(err => {
        this.loadingService.setLoading(false, req.url);
        return throwError(() => err);
      }),
      finalize(() => this.loadingService.setLoading(false, req.url))
    );
  }
}
