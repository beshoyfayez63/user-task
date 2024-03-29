import { HeaderComponent } from "../components/header/header.component";
import type { ISearchConfig } from "../../../lib/search-input/types/search-config";
import { catchError, map, of } from "rxjs";
import { IUser } from "../../../features/user/types/IUser";

export const search = (header: HeaderComponent): ISearchConfig<IUser[]> => ({
  getResults: (query: string) => {
    return header.userService.getUserDetails(query).pipe(
      map(res => [res.data]),
      catchError(err => {
        return of([])
      }),
    )
  }
})
