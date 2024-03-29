import { ListUserComponent } from "../pages/list-user/list-user.component";
import { Observable, of } from "rxjs";
import type { IUsersRes } from "../types/IUsersRes";
import type { IUser } from "../types/IUser";
import type { IPaginationSettings } from "../../../lib/listing/pagination/types/IPagination";
import type { ICardListConfig } from "../../../lib/listing/card-listing/types/ICardListConfig";

export const cardConfig = (userListComponent: ListUserComponent): ICardListConfig<IUsersRes, IUser[]> => ({
  getData: (page: number): Observable<IUsersRes> => {
    return userListComponent.userService.fetchUsers(page)
  },
  dataMapper: (res: IUsersRes): Observable<IUser[]> => {
    return of(res.data);
  },
  paginationMapper: (res: IUsersRes): IPaginationSettings => ({
    totalItems: res.total,
    totalPages: res.total_pages,
    rpp: res.per_page
  })
})
