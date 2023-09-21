import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { ROUTES_NAME } from 'src/app/constants/routing.constant';

const routes: Routes = [
  { path: ROUTES_NAME.USER_LIST, component: UserListComponent },
  { path: ROUTES_NAME.USER_CREATE, component: UserCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
