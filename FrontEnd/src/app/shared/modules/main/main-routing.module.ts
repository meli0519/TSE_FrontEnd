import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from '../../components/department/department.component';
import { PruebaComponent } from '../../components/prueba/prueba.component';

const routes: Routes = [

  {
    path: "",
    children: [
      {path: 'prueba', component: PruebaComponent},
      {path: 'department', component: DepartmentComponent}
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
