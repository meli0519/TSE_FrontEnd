import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import {MainComponent} from './shared/components/main/main.component'

const routes: Routes = [

  {
    path:'', 
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainComponent
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
