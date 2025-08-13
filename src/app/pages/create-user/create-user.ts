import { Component, Inject } from '@angular/core';
import { UserForm } from '../../components/user-form/user-form';
import { ButtonGroup } from '../../components/button-group/button-group';
import { AnchorItem } from '../../interfaces/anchor-item';
import { UserService } from '../../services/user-service/user-service';
import { UserModel } from '../../models/users/user-model';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service/toast-service';

@Component({
  selector: 'app-create-user',
  imports: [UserForm, ButtonGroup],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css'
})
export class CreateUser {


  constructor(
    @Inject(UserService) private userService: UserService, 
    @Inject(Router) private router: Router,
    @Inject(ToastService) private toastService: ToastService, 
  ) {

  }

  buttons: AnchorItem[] = [
    {
      type: "anchor",
      path: "/home",
      text: "Voltar"
    }
  ]

  public submitToCreate(userModel: UserModel) {
    this.toastService.removeAll();
    
    this.userService.createUser(userModel, () => this.router.navigate(["/home"]));
    
  }

}
