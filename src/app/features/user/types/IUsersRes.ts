import type { IUser } from "./IUser";

export interface IUsersRes {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[]
}
