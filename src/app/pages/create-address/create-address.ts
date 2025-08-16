import { Component, effect, Inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { AddressForm } from '../../components/address-form/address-form';
import { AnchorItem } from '../../interfaces/anchor-item';
import { ButtonGroup } from '../../components/button-group/button-group';
import { AddressService } from '../../services/address-service/address-service';
import { AddressModel } from '../../models/addresses/address-model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service/user-service';
import { CepService } from '../../services/cep-service/cep-service';

@Component({
  selector: 'app-create-address',
  imports: [AddressForm, ButtonGroup],
  templateUrl: './create-address.html',
  styleUrl: './create-address.css'
})
export class CreateAddress implements OnInit {
  
  constructor(
    @Inject(AddressService) private addressService: AddressService,
    @Inject(UserService) private userService: UserService,
    @Inject(CepService) private cepService: CepService,
    @Inject(Router) private router: Router
  ) {
    effect(() => {
      const user = this.userService.user(); 
      if (user !== null) {
        this.backButton.set([{
          type: "anchor",
          path: `/users/${user.id}`,
          text: "Voltar"
        }]);
      }
    });
  }
 
  backButton = signal<AnchorItem[]>([]);

  ngOnInit(): void {
      
      this.userService.findUserById();
  }

  public createAddress(address: AddressModel) {
    const user = this.userService.user();
    this.addressService.createAddress(address, () => {
      
      this.router.navigate([`/users/${user?.id}`]);
    })
    
  }

  public fillAddressInfo(models: Record<string, WritableSignal<any>>) {
    this.cepService.findAddressByCep(models);
  }



}
