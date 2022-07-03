import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from '../../components/department/department.component';
import { UserComponent } from '../../components/user/user.component';
import { AddComponent } from '../../../shared/components/department/add/add.component';
import { EditComponent } from '../../../shared/components/department/edit/edit.component';
import { RequestComponent } from '../../../shared/components/request/request.component'
import { ResponseComponent } from '../../components/response/response.component';
import { ViewRequestComponent } from '../../components/view-request/view-request.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {path: 'department', component: DepartmentComponent},
      {path: 'user', component:  UserComponent},
      {path: 'addDepartment', component: AddComponent},
      {path: 'editDepartment', component:  EditComponent},
      {path: 'request', component:  RequestComponent},
      {path: 'response', component: ResponseComponent},
      {path: 'viewRequest/:id_solicitud', component: ViewRequestComponent}
    ]
  }
];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
