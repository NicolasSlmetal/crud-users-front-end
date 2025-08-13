import { Component, EventEmitter, input, Output } from '@angular/core';
import { AddressModel } from '../../models/addresses/address-model';
import { AddressCard } from '../address-card/address-card';

@Component({
  selector: 'app-address-card-container',
  imports: [AddressCard],
  templateUrl: './address-card-container.html',
  styleUrl: './address-card-container.css'
})
export class AddressCardContainer {
  addresses = input.required<AddressModel[]>();

  @Output("clickToDelete") clickToDelete = new EventEmitter<AddressModel>();


  public sendToDelete(address: AddressModel) {
    this.clickToDelete.emit(address);
  }
  
}
