import { Component, Inject, OnInit, signal } from '@angular/core';
import { UserForm } from '../../components/user-form/user-form';
import { UserService } from '../../services/user-service/user-service';
import { UserModel } from '../../models/users/user-model';
import { Router } from '@angular/router';
import { AnchorItem } from '../../interfaces/anchor-item';
import { ButtonGroup } from '../../components/button-group/button-group';

@Component({
  selector: 'app-update-user',
  imports: [UserForm, ButtonGroup],
  templateUrl: './update-user.html',
  styleUrl: './update-user.css'
})
export class UpdateUser implements OnInit {

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(Router) private router: Router
  ) {
    
  }
  
  backButton = signal<AnchorItem>({} as AnchorItem);
  user = signal<UserModel>({} as UserModel);

  ngOnInit(): void {
      const user = this.userService.user();
      this.userService.findUserById();
      if (user !== null) {
        this.backButton.set({
          type: "anchor",
          text: "Voltar",
          path: `/users/${user.id}`
        });
        this.user.set(user);  
      }
  } 

  updateUser(user: UserModel) {
    this.userService.updateUser(user, () => {
      this.router.navigate([`/users/${user.id}`]);
    })
  }
}
