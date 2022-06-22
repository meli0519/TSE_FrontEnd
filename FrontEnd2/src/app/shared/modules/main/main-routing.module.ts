import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from '../../components/department/department.component';
import { UserComponent } from '../../components/user/user.component';
import { AddComponent } from '../../../shared/components/department/add/add.component';
import { EditComponent } from '../../../shared/components/department/edit/edit.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {path: 'department', component: DepartmentComponent},
      {path: 'user', component:  UserComponent},
      {path: 'addDepartment', component: AddComponent},
      {path: 'editDepartment', component:  EditComponent}
    ]
  }
];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
