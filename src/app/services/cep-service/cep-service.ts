import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { AddressModel } from '../../models/addresses/address-model';
import { ErrorHandlerService } from '../error-handler-service/error-handler-service';
import { catchError } from 'rxjs';
import { LoadingService } from '../loading-service/loading-service';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  constructor(
    @Inject(HttpClient) private httpClient: HttpClient,
    @Inject(ErrorHandlerService) private errorHandlerService: ErrorHandlerService,
    @Inject(LoadingService) private loadingService: LoadingService
  ) {

  }

  private environment = environment;

  public findAddressByCep(models: Record<string, WritableSignal<any>>) {
    const {cep, state, street, neighborhood, number, city} = models;
    this.loadingService.load();
    this.httpClient.get<AddressModel>(`${environment.baseApiUrl}/cep/${cep()}`)
    .pipe(
      catchError((error, model) => {
        state.set("");
        street.set("");
        neighborhood.set("");
        city.set("");
        return this.errorHandlerService.handleError(error, "Erro ao buscar endereço pelo CEP");
      })
    )
    .subscribe(
      (model) => {
        this.loadingService.finish();
        state.set(model.state);
        city.set(model.city);
        street.set(model.street);
        neighborhood.set(model.neighborhood)
      }
    )
  }
}
