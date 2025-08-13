import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-modal',
  imports: [],
  templateUrl: './loading-modal.html',
  styleUrl: './loading-modal.css'
})
export class LoadingModal {
  isLoading = input.required<boolean>();
}
