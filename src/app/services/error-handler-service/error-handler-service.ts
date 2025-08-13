import { Inject, Injectable } from '@angular/core';
import { ToastService } from '../toast-service/toast-service';
import { HttpErrorResponse } from '@angular/common/http';
import { parseErrorMessages } from '../../utils/parse-error-messages';
import { throwError } from 'rxjs';
import { LoadingService } from '../loading-service/loading-service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor (
    @Inject(ToastService) private toastService: ToastService,
    @Inject(LoadingService) private loadingService: LoadingService
  ) {

  }

  public handleError(error: HttpErrorResponse, customMessageForUnknownError? : string, onEnd? :() => void) {
    this.loadingService.finish();
    const errorMessage = parseErrorMessages(error, customMessageForUnknownError);
    this.toastService.add(errorMessage);
    if (onEnd !== undefined && onEnd !== null) {
      onEnd();
    }
    return throwError(() => new Error(error.message));
  }
}
