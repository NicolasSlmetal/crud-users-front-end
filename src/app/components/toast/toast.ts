import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class Toast {

    type = input.required<"SUCCESS" | "WARNING" | "ERROR">();
    message = input.required<string>();
    timestamp = input.required<Date>();

    @Output("close") close = new EventEmitter<Date>();

    selfDestruct() {
      this.close.emit(this.timestamp());
    }
}
