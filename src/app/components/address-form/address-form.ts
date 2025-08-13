import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, model, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressModel } from '../../models/addresses/address-model';

@Component({
  selector: 'app-address-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './address-form.html',
  styleUrl: './address-form.css'
})
export class AddressForm implements OnInit {
  
  constructor() {
    this.previousState = {
        id: Number(this.id()),
        cep: this.cep(),
        street: this.street(),
        neighborhood: this.neighborhood(),
        city: this.city(),
        number: this.number(),
        state: this.state()
      }
  }

  ngOnInit(): void {
    this.previousState = {
      id: Number(this.id()),
      cep: this.cep(),
      street: this.street(),
      neighborhood: this.neighborhood(),
      city: this.city(),
      number: this.number(),
      state: this.state()
    }
  }

  previousState : AddressModel;
  id = input<number | null>(null)
  cep = model<string>("");
  errorCep = signal<string>("");
  street = model<string>("");
  errorStreet = signal<string>("");
  number = model<string>("");
  errorNumber = signal<string>("");
  neighborhood = model<string>("");
  errorNeighborhood = signal<string>("");
  city = model<string>("");
  errorCity = signal<string>("");
  state = model<string>("");
  errorState = signal<string>("");

  @Output("addressSubmit") onSubmit = new EventEmitter<AddressModel>();

  isValid = signal<boolean>(false);

  public submit() {
    this.onSubmit.emit({
      id: Number(this.id()),
      cep: this.cep().trim().replace(/[^0-9]/, ""),
      number: this.number().trim(),
      street: this.street().trim(),
      neighborhood: this.neighborhood().trim(),
      city: this.city().trim(),
      state: this.state().trim()
    });
  }

  private isEqualBeforeData() {
    const cep = this.cep().trim();
    const street = this.street().trim();
    const number = this.number().trim();
    const neighborhood = this.neighborhood().trim();
    const city = this.city().trim();
    const state = this.state().trim();

    return this.previousState.cep === cep
    && street === this.previousState.street
    && number === this.previousState.number
    && neighborhood === this.previousState.neighborhood
    && city === this.previousState.city
    && state === this.previousState.state;
  }

  private validateForm() {
    this.isValid.set(this.isValidCep() 
    && this.isValidStreet() 
    && this.isValidNumber()
    && this.isValidNeighborhood() 
    && this.isValidCity() 
    && this.isValidState()
    && !this.isEqualBeforeData()
  );
  }

  public validateCep() {
    this.validateForm();
    if (this.isValidCep()) {
      this.errorCep.set("");
    } else {
      this.errorCep.set("CEP inválido");
    }
  }

  public validateStreet() {
    this.validateForm();
    if (this.isValidStreet()) {
      this.errorStreet.set("");
    } else {
      this.errorStreet.set("Rua inválida");
    }
  }

  public validateNumber() {
    this.validateForm();
    if (this.isValidNumber()) {
      this.errorNumber.set("");
    } else {
      this.errorNumber.set("Número inválido")
    }
  }

  public validateNeighborhood() {
    this.validateForm();
    if (this.isValidNeighborhood()) {
      this.errorNeighborhood.set("");
    } else {
      this.errorNeighborhood.set("Bairro inválido");
    }
  }

  public validateCity() {
    this.validateForm();
    if (this.isValidCity()) {
      this.errorCity.set("");
    } else {
      this.errorCity.set("Cidade inválida");
    }
  }

  public validateState() {
    this.validateForm();
    if (this.isValidState()) {
      this.errorState.set("");
    } else {
      this.errorState.set("Estado inválido");
    }
  }

  private isValidCep() {
    const cep = this.cep()?.replace(/(\d{5})(-)(\d{3})/, "$1$3").trim();
    return /^\d{8}$/.test(cep);
  }

  private isValidStreet() {
    const street = this.street()?.trim()
    return street !== undefined 
    && street !== null 
    && street.length > 0
    && street.length <= 255;
  }

  private isValidNumber() {
    const number = this.number()?.trim();
    return number !== undefined 
    && number !== null 
    && number.length > 0
    && number.length <= 20
  }

  private isValidNeighborhood() {
    const neighborhood = this.neighborhood()?.trim();
    return neighborhood !== undefined
    && neighborhood !== null
    && neighborhood.length > 0
    && neighborhood.length <= 255;
  }

  private isValidCity() {
    const city = this.city()?.trim();
    return city !== undefined
    && city !== null
    && city.length > 0
    && city.length <= 255;
  }

  private isValidState() {
    const state = this.state()?.trim();
    return state !== null 
    && state !== undefined
    && state.length > 0
    && state.length <= 19;
  }

  


}
