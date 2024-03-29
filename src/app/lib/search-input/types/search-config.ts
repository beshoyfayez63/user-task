import { Observable } from "rxjs";

export interface ISearchConfig<T extends any[]> {
  getResults(query: string): Observable<T>;
}
