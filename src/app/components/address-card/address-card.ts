import { Component, EventEmitter, input, OnInit, Output, signal } from '@angular/core';
import { ButtonGroup } from '../button-group/button-group';
import { ButtonItem } from '../../interfaces/button-item';
import { AnchorItem } from '../../interfaces/anchor-item';
import { AddressModel } from '../../models/addresses/address-model';
import { CepPipe } from '../../pipes/cep-pipe/cep-pipe';

@Component({
  selector: 'app-address-card',
  imports: [ButtonGroup, CepPipe],
  templateUrl: './address-card.html',
  styleUrl: './address-card.css'
})
export class AddressCard implements OnInit {

  ngOnInit(): void {
      this.buttons.set(
        [
          {
            type: "anchor",
            text: "Editar",
            path: `addresses/${this.address().id}/edit`,
          }, 
          {
            type: "button",
            text: "Deletar",
            extraClasses: ["danger"],
            callback: () => this.sendToConfirmDelete()
          }
        ]
      )
  }
  
  address = input.required<AddressModel>();
  
  @Output("clickToDelete") clickToDelete = new EventEmitter<AddressModel>();

  public sendToConfirmDelete() {
    this.clickToDelete.emit(this.address());
  }

  buttons  = signal<Array<ButtonItem | AnchorItem>>([]);


}
