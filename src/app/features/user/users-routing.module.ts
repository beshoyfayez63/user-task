import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from "./pages/list-user/list-user.component";
import { ViewUserComponent } from "./pages/view-user/view-user.component";
import { fetchUserResolver } from "./resolvers/fetch-user.resolver";

/**
 * No need to lazy loading routes because it's simple application with one module.
 */
const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: ListUserComponent},
  {
    path: 'users/:id',
    component: ViewUserComponent,
    resolve: {
      user: fetchUserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
