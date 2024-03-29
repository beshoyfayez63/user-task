import { Injectable } from '@angular/core';
import { HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CachingService {

  private cache = new Map<string, HttpResponse<any>>();

  set(key: string, data: HttpResponse<any>) {
    this.cache.set(key, data);
  }

  get(key: string) {
    return this.cache.get(key)
  }

  has(key: string) {
    return this.cache.has(key);
  }
}
