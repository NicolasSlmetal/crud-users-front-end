import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
    isLoading = signal<boolean>(false);

    public load() : void {
      this.isLoading.set(true);
    }

    public finish() : void {
      this.isLoading.set(false);
    }
}
