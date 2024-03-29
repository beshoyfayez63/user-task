import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersRoutingModule } from "./users-routing.module";
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { ListingModule } from "../../lib/listing/listing.module";



@NgModule({
  declarations: [
    ListUserComponent,
    UserCardComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    ListingModule,
    UsersRoutingModule,
  ],
})
export class UserModule { }
