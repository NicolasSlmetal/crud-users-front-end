import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  public formatPhone(phone: string) {
    return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  }

  public formatCep(cep: string) {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
}
