import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { UserItemListComponent } from './user-item-list/user-item-list.component';


const routes: Routes = [
  {path: '', component : LoginComponent},
  {path: 'app-sign-up', component : SignUpComponent},
  {path: 'app-home', component : HomeComponent},
  {path: 'app-order-details', component : OrderDetailsComponent},
  {path: 'app-user-item-list', component : UserItemListComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AppRoutingModule { }
