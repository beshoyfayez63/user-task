import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable()
export class LoaderService {

  loadingSub = new BehaviorSubject(false);

  loadingRequests = new Map<string, boolean>();


  setLoading(loading: boolean) {
    this.loadingSub.next(loading);
  }
}
