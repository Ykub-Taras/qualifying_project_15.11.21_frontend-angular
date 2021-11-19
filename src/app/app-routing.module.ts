import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersListbarComponent} from "./users-listbar/users-listbar.component";
import {UserControlPanelComponent} from "./user-control-panel/user-control-panel.component";

const routes: Routes = [


  {path: "", redirectTo: "users", pathMatch: "full"},

  {path: "users", component: UsersListbarComponent},

  {path: "createNewUser", component: UserControlPanelComponent, outlet: "controlPanel"},

  {path: "user/:id", component: UserControlPanelComponent, outlet: "controlPanel"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
