import { Component, effect, Inject, OnInit, signal } from '@angular/core';
import { UserTable } from '../../components/user-table/user-table';
import { UserService } from '../../services/user-service/user-service';
import { LoadingService } from '../../services/loading-service/loading-service';
import { ButtonGroup } from '../../components/button-group/button-group';
import { AnchorItem } from '../../interfaces/anchor-item';

@Component({
  selector: 'app-home',
  imports: [UserTable, ButtonGroup],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  constructor(
    @Inject(UserService) public userService: UserService, 
    @Inject(LoadingService) private loadingService: LoadingService,
  ) {
      effect(() => {
        if (!this.searched()) {
          return;
        }
        
        this.showEmptyMessage.set(this.userService.users().length === 0);
      });
  }

  buttons : AnchorItem[] = [{
    type: "anchor",
    path: "/users/create",
    text: "Criar usuário"
  }]
  
  searched = signal<boolean>(false);
  showEmptyMessage = signal<boolean>(false);
  
  ngOnInit(): void {
    this.userService.fetchUsers(() => {
      this.searched.set(true);
    });
    
  }
  
}
