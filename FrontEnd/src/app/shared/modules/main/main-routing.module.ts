import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from '../../components/department/department.component';
import { PruebaComponent } from '../../components/prueba/prueba.component';
import { UserComponent } from '../../components/user/user.component';
import { AddComponent } from '../../components/user/add/add.component';
import { EditComponent } from '../../components/user/edit/edit.component';

const routes: Routes = [

  {
    path: "",
    children: [
      {path: 'prueba', component: PruebaComponent},
      {path: 'department', component: DepartmentComponent},
      {path: 'user', component: UserComponent
    }
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
