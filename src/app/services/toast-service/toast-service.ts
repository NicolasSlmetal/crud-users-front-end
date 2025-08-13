import { Injectable, signal } from '@angular/core';
import { Message } from '../../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _messages = signal<Message[]>([]);
  public messages = this._messages.asReadonly();

  add(message: Message) {
    this._messages.update(msgs =>  [...msgs, message]);
    setTimeout(() => this.removeByTimestamp(message.timestamp) , 4000);
  }

  removeAll() {
    this._messages.set([]);
  }

  removeByTimestamp(timestamp: Date) {
    this._messages.update(msgs => msgs.filter(msg => msg.timestamp !== timestamp));
  }
}
