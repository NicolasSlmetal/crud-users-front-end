import { Component, input } from '@angular/core';
import { UserModel } from '../../models/users/user-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-table',
  imports: [RouterLink],
  templateUrl: './user-table.html',
  styleUrl: './user-table.css'
})
export class UserTable {

  constructor() {

  }

  showEmptyMessage = input<boolean>(false);
  users = input.required<UserModel[]>();
  

}
