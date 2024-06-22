import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, map, of, tap } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { CachingService } from "../services/caching.service";

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  cachingService = inject(CachingService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Caching requests only that have the cache header only, because maybe another GET requests don't need to be cached
    // if you need to cache all GET requests then check req.method === 'GET' then check for caching else no caching.
    // maybe in the future need to add a user, then need to update the cache or clear it
    if(!req.headers.has('cache')) return next.handle(req);

    const cachedResponse = this.cachingService.get(req.url);

    if(cachedResponse) return of(cachedResponse);

    return this.sendReqWithCache(req, next)
  }

  sendReqWithCache(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if(event instanceof HttpResponse) this.cachingService.set(req.url, event)
    })
  )
  }
}
