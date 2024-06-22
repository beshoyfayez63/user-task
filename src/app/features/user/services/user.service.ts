import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IUsersRes } from "../types/IUsersRes";
import { IUserDetailRes } from "../types/IUserDetailRes";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders().append('cache', 'cache');

  private http = inject(HttpClient);
  private router = inject(Router);

  fetchUsers(page: number = 1) {
    return this.http.get<IUsersRes>(`${environment.api}/users?page=${page}`, {
      headers: this.headers
    })
  }

  getUserDetails(id: string | number) {
    return this.http.get<IUserDetailRes>(`${environment.api}/users/${id}`, {
      headers: this.headers
    });
  }

  async goToUserDetailsPage(id: string | number) {
    await this.router.navigate([`/users/${id}`])
  }
}
