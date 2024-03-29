import { Component, inject } from '@angular/core';
import { UserService } from "../../services/user.service";
import { cardConfig } from "../../config/card";
import { Router } from "@angular/router";
import { IUser } from "../../types/IUser";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent {

  cardConfig = cardConfig(this);

  userService = inject(UserService);

  trackUser(_: number, item: IUser) {
    return item.id;
  }
}
