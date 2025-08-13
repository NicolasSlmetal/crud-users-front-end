import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css'
})
export class ConfirmModal {
  isOpen = input<boolean>(false);
  title = input.required<string>();
  message = input.required<string>();
  
  @Output("onConfirm") onConfirm = new EventEmitter<void>();
  @Output("onCancel") onCancel = new EventEmitter<void>();

  public confirmAction() {
    this.onConfirm.emit();
  }

  public cancelAction() {
    this.onCancel.emit();
  }
}
