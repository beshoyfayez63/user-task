import { Component, Input } from '@angular/core';
import type { IUser } from "../../types/IUser";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  host: {
    class: 'user-card'
  }
})
export class UserCardComponent {
  @Input() user?: IUser;
}
