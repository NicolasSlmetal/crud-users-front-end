import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { UserModel } from '../../models/users/user-model';
import { LoadingService } from '../loading-service/loading-service';
import { CompleteUserModel } from '../../models/users/complete-user-model';
import { ToastService } from '../toast-service/toast-service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { ErrorHandlerService } from '../error-handler-service/error-handler-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    @Inject(HttpClient) private httpClient: HttpClient,
    @Inject(ErrorHandlerService) private errorHandlerService: ErrorHandlerService,
    @Inject(ToastService) private toastService: ToastService, 
    @Inject(LoadingService) private loadingService: LoadingService,
    @Inject(Router) private router: Router
  ) {

  }

  environment = environment;
  users = signal<UserModel[]>([]);
  user = signal<CompleteUserModel | null>(null);

  public fetchUsers(onEnd?: () => void) {
    this.loadingService.load();
    
    this.httpClient.get<UserModel[]>(`${environment.baseApiUrl}/users`)
    .pipe(
      catchError((error, model) => {
        return this.errorHandlerService.handleError(error, "Não foi possível buscar todos os usuários");
     })
    )
    .subscribe({
      next: users => {
        setTimeout(() => {
          this.loadingService.finish();
          this.users.set(users);
          if (onEnd !== undefined) {
            onEnd();
          }
          
        }, 200)
      },
    });

  }

  public getUserIdFromURL() {
    const url = this.router.url;
    
    const idWithSlashes = url.match(/\/users\/[0-9]+[\/]*/)?.[0];
    
    if (idWithSlashes === undefined) {
      
      return NaN;
    }
    
    return Number(idWithSlashes.split("/")[2]);
  } 

  private getUserFromCache() : CompleteUserModel | null {
    const userId = this.getUserIdFromURL();

    if (isNaN(userId)) {
      return null;
    }

    const user : CompleteUserModel = JSON.parse(sessionStorage.getItem(`user-${userId}`) ?? "{}");

    if (Object.keys(user).length === 0) {
      return null
    }

    return user;
  }
 
  public findUserById(onError? : () => void) {
    
    this.user.set(this.getUserFromCache());
    
    if (this.user() !== null) {
      return;
    }
    
    const userId = this.getUserIdFromURL();
    
    this.loadingService.load();
    this.httpClient.get<CompleteUserModel>(`${environment.baseApiUrl}/users/${userId}`)
    .pipe(
      catchError((error, model) => {
        return this.errorHandlerService.handleError(error, "Não foi possível buscar o usuário", onError);
      })
    )
    .subscribe({
      next: userModel => {
        setTimeout(() => {
          this.loadingService.finish();
          this.user.set(userModel)
          sessionStorage.setItem(`user-${userModel.id}`, JSON.stringify(this.user()));
        }, 200);
      }, 
    });
  }

  public createUser(userModel: UserModel, onEnd? : (...params : any) => void) {
    this.loadingService.load();
    this.httpClient.post<UserModel>(`${environment.baseApiUrl}/users`, userModel)
    .pipe(
     catchError((error, model) => {
        return this.errorHandlerService.handleError(error, "Não foi possível criar o usuário");
     })
    )
    .subscribe({
      next: user => {
        this.loadingService.finish();
        this.toastService.add({
          text: `Usuário ${user.name} criado com sucesso!`,
          type: "SUCCESS",
          timestamp: new Date()
        });
      },
      complete: onEnd
    });
  }

  public updateUser(userModel: UserModel, onEndCallback? : () => void) {
    sessionStorage.removeItem(`user-${userModel.id}`);
    this.loadingService.load()
    this.httpClient.put<UserModel>(`${environment.baseApiUrl}/users/${userModel.id}`, userModel)
    .pipe(
      catchError((error, model) => {
        return this.errorHandlerService.handleError(error, "Não foi possível atualizar o usuário");
     })
    )
    .subscribe(
      {
        next: (userModel) => {
          setTimeout(() => {
            this.toastService.add({
              text: `Usuário ${userModel.name} atualizado com sucesso!`,
              type: "SUCCESS",
              timestamp: new Date()
            });
            this.router.navigate([`/users/${userModel.id}`]);
            this.loadingService.finish();
          }, 200)
        }
      }
    )
  }

  public deleteUser(onEnd? : () => void) {
    const userId = this.getUserIdFromURL();

    this.loadingService.load();
    this.httpClient.delete<void>(`${environment.baseApiUrl}/users/${userId}`)
    .pipe(
      catchError((error, model) => {
        return this.errorHandlerService.handleError(error, "Não foi possível deletar o usuário");
     })
    )
    .subscribe({
      next: () => {
        this.loadingService.finish();
        this.toastService.add({
          text: "Usuário deletado com sucesso!",
          timestamp: new Date(),
          type: "SUCCESS"
        });
        sessionStorage.removeItem(`user-${userId}`);
      },
      complete: onEnd
    });
  }
}
