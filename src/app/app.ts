import { Component, Inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingModal } from './components/loading-modal/loading-modal';
import { LoadingService } from './services/loading-service/loading-service';
import { ToastContainer } from './components/toast-container/toast-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingModal, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-end');
  constructor(@Inject(LoadingService) private loadingService : LoadingService) {

  }

  public isLoading() {
    return this.loadingService.isLoading();
  }


}
