import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { DepartmentComponent } from '../../components/department/department.component';
import { PruebaComponent } from '../../components/prueba/prueba.component';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    DepartmentComponent,
    PruebaComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule
    
    

  ]
})
export class MainModule { }
