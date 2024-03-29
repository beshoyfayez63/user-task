import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * No need for lazy loading routes because it's simple application with one main module,
 * Just import UserModule in AppModule imports array.
 *
 */
const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./features/user/users.module').then(m => m.UserModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
