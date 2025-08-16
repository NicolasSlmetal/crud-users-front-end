import { Component, input } from '@angular/core';
import { UserModel } from '../../models/users/user-model';
import { RouterLink } from '@angular/router';
import { PhonePipe } from '../../pipes/phone-pipe/phone-pipe';

@Component({
  selector: 'app-user-table',
  imports: [RouterLink, PhonePipe],
  templateUrl: './user-table.html',
  styleUrl: './user-table.css'
})
export class UserTable {

  constructor() {

  }

  showEmptyMessage = input<boolean>(false);
  users = input.required<UserModel[]>();
  

}
