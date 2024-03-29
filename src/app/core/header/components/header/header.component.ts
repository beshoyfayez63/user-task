import { Component, inject } from '@angular/core';
import { search } from "../../config/search";
import { UserService } from "../../../../features/user/services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userService = inject(UserService);

  config = search(this);

  async goToUserDetailsPage(id: string | number | null | undefined) {
    if(!id) return;
    await this.userService.goToUserDetailsPage(id);
  }
}
