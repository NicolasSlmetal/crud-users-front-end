import { Component, Inject } from '@angular/core';
import { Toast } from '../toast/toast';
import { ToastService } from '../../services/toast-service/toast-service';

@Component({
  selector: 'app-toast-container',
  imports: [Toast],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css'
})
export class ToastContainer {

  constructor(@Inject(ToastService) private toastService: ToastService) {
    
  }
  
  public getMessages() {
    return this.toastService.messages();
  }

  public removeByTimestamp(timestamp: Date) {
    this.toastService.removeByTimestamp(timestamp);
  }

}
