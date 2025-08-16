import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, model, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../models/users/user-model';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm implements OnInit {

  constructor() {
    this.previousState = {
      id: Number(this.id()),
      name: this.name(),
      email: this.email(),
      phone: this.phone(),
    }
  }

  @Output("userSubmit") submitData = new EventEmitter<UserModel>();
  
  ngOnInit(): void {
    this.previousState = {
      id: Number(this.id()),
      name: this.name(),
      email: this.email(),
      phone: this.phone(),
    }

    this.validateForm();
  }

  private previousState : UserModel;
  id = input<number | null>(null);
  name = model<string>("");
  errorName = signal<string>("");
  email = model<string>("");
  errorEmail = signal<string>("");
  phone = model<string>("");
  errorPhone = signal<string>("");

  isValid = signal<boolean>(false);

  public validateForm() {
    
    this.isValid.set(this.isEmailValid() 
    && this.isNameValid() 
    && this.isPhoneValid() 
    && !this.isEqualBeforeData())
    
  }

  public validateName() {
    this.validateForm();
    if (!this.isNameValid()) {
      this.errorName.set("O nome é inválido")
    } else {
      this.errorName.set("");
    }
  }

  public validateEmail() {
    this.validateForm();
    if (!this.isEmailValid()) {
      this.errorEmail.set("O E-mail é inválido")
    } else {
      this.errorEmail.set("");
    }
  }

  public validatePhone() {
    this.validateForm();
    if (!this.isPhoneValid()) {
      this.errorPhone.set("O telefone é inválido")
    } else {
      this.errorPhone.set("");
    }
  }

  public submit() {
    this.submitData.emit({
      id: Number(this.id()),
      name: this.name().trim(),
      email: this.email().trim(),
      phone: this.phone().replace(/[^0-9]/, "").trim()
    });
  }

  private isEqualBeforeData() {
    const name = this.name().trim();
    const email = this.email().trim();
    const phone = this.phone().trim();

    return this.previousState.email === email &&
    this.previousState.name === name &&
    this.previousState.phone === phone
  }

  private isNameValid() {
    const name = this.name();
    return name !== undefined && name !== null && name.length > 0 && name.length < 255;
  }

  private isEmailValid() {
    const email = this.email();
    return email !== undefined && email !== null && email.length > 0 &&
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }

  private isPhoneValid() {
    const phone = this.phone().replace(/[^0-9]/, "");
    return phone !== undefined && 
    phone !== null &&
    /^\d{10,12}$/.test(phone);
  }

}
