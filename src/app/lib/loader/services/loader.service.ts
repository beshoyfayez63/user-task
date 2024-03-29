import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable()
export class LoaderService {

  loadingSub = new BehaviorSubject(false);

  loadingRequests = new Map<string, boolean>();

  setLoading(loading: boolean, url: string) {
    if(loading) {
      this.loadingRequests.set(url, loading);
      this.loadingSub.next(true);
    }

    if(!loading && this.loadingRequests.has(url)) this.loadingRequests.delete(url);

    if(!this.loadingRequests.size) this.loadingSub.next(false);
  }
}
