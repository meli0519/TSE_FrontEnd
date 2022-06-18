import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserAddComponent} from '../user/user-add/user-add.component'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
