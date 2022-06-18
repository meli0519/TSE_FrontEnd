import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from '../../components/department/department.component';
import { UserComponent } from '../../components/user/user.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {path: 'department', component: DepartmentComponent},
      {path: 'user', component:  UserComponent}
    ]
  }
];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
