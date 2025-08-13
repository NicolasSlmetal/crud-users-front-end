import { Inject, Injectable, signal } from '@angular/core';
import { LoadingService } from '../loading-service/loading-service';
import { HttpClient } from '@angular/common/http';
import { AddressModel } from '../../models/addresses/address-model';
import { Router } from '@angular/router';
import { ToastService } from '../toast-service/toast-service';
import { UserService } from '../user-service/user-service';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from '../error-handler-service/error-handler-service';
import { environment } from '../../../environments/environment.dev';
import { FormatService } from '../format-service/format-service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    @Inject(LoadingService) private loadingService: LoadingService,
    @Inject(HttpClient) private httpClient: HttpClient,
    @Inject(ErrorHandlerService) private errorHandlerService: ErrorHandlerService,
    @Inject(UserService) private userService: UserService,
    @Inject(ToastService) private toastService: ToastService,
    @Inject(Router) private router: Router
  ) {

  }

  environment = environment;
  address = signal<AddressModel | null>(null);
  addresses = signal<AddressModel[]>([]);

  private getAddressIdFromURL() {
    const url = this.router.url;
    const idWithSlashes = url.match(/\/addresses\/[0-9]+\//)?.[0];
    if (idWithSlashes === undefined) {
      return NaN;
    }

    return Number(idWithSlashes.split("/")[2]);
  }

  public deleteAddress(address: AddressModel, onEnd?: () => void) {
    const userId = this.userService.getUserIdFromURL();
    if (isNaN(userId)) {
      this.toastService.add({
        text: "Usuário não encontrado",
        timestamp: new Date(),
        type: "WARNING"
      });
      return;
    }
    this.loadingService.load();
    this.httpClient.delete<void>(`${environment.baseApiUrl}/users/${userId}/addresses/${address.id}`)
    .pipe(
      catchError((error, model) => {
        return this.errorHandlerService.handleError(error, "Não foi possível deletar o endereço");
      })
    )
    .subscribe({
      next: () => {
        setTimeout(() => {
          this.loadingService.finish();
          this.toastService.add({
            text: "Endereço deletado com sucesso",
            timestamp: new Date(),
            type: "SUCCESS"
          });
          sessionStorage.removeItem(`user-${userId}`);
        }
          , 200)
      },
      complete: onEnd
    })
  }

  public updateAddress(address: AddressModel, onEnd?: () => void) {
    const userId = this.userService.getUserIdFromURL();
    if (isNaN(userId)) {
      this.toastService.add({
        text: "Usuário não encontrado",
        timestamp: new Date(),
        type: "WARNING"
      });
      return;
    }
    this.loadingService.load();
    this.httpClient.put<AddressModel>(`${environment.baseApiUrl}/users/${userId}/addresses/${address.id}`, address)
    .pipe(
      catchError((error, model) => {
        return this.errorHandlerService.handleError(error, "Não foi possível atualizar o endereço");
      })
    )
    .subscribe({
      next: (address) => {
        
        setTimeout(() => {
          this.loadingService.finish();
          this.address.set(address);
          this.toastService.add({
            text: "Sucesso ao atualizar o endereço",
            timestamp: new Date(),
            type: "SUCCESS"
          });
        }, 200);
      },
      complete: onEnd
    })
  }

  public findAddressById(onError?: () => void) {
    const id = this.getAddressIdFromURL();
    const userId = this.userService.getUserIdFromURL();
    if (isNaN(id) || isNaN(userId)) {
      return;
    }
    this.loadingService.load();
    this.httpClient.get<AddressModel>(`${environment.baseApiUrl}/users/${userId}/addresses/${id}`)
    .pipe(
      catchError((error, model) => {
        return this.errorHandlerService.handleError(error, "Não foi possível buscar o endereço", onError);
      })
    )
    .subscribe(address => {
      setTimeout(() => {
      this.loadingService.finish();
      this.address.set(address);
      sessionStorage.removeItem(`user-${userId}`);
      }, 200);
    })
  }

  public createAddress(addressModel: AddressModel, onEnd? :() => void) {
    
    const userId = this.userService.getUserIdFromURL();
    this.loadingService.load();
    this.httpClient.post<AddressModel>(`${environment.baseApiUrl}/users/${userId}/addresses`, addressModel)
    .pipe(
      catchError((error, model) => {
        return this.errorHandlerService.handleError(error, "Não foi possível criar o enderço");
      })
    )
    .subscribe({
      next: addressModel => {
        setTimeout(() => {
          this.loadingService.finish();
          this.toastService.add({
            type: "SUCCESS",
            text: "Endereço criado com sucesso!",
            timestamp: new Date()
          });
          this.userService.user.update(userModel => {
            const user = userModel
            if (user === null) return userModel;
            user.addresses = [...user.addresses, addressModel]
            
            return {
              ...user
            };
          });
          sessionStorage.removeItem(`user-${userId}`);
          
        }, 200)
      },
      complete: onEnd
    });
  }
  
}
