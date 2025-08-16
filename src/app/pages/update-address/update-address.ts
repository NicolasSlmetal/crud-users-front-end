import { Component, effect, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ButtonGroup } from '../../components/button-group/button-group';
import { AddressForm } from '../../components/address-form/address-form';
import { AddressService } from '../../services/address-service/address-service';
import { UserService } from '../../services/user-service/user-service';
import { AddressModel } from '../../models/addresses/address-model';
import { AnchorItem } from '../../interfaces/anchor-item';
import { Router } from '@angular/router';
import { UserModel } from '../../models/users/user-model';
import { CepService } from '../../services/cep-service/cep-service';

@Component({
  selector: 'app-update-address',
  imports: [ButtonGroup, AddressForm],
  templateUrl: './update-address.html',
  styleUrl: './update-address.css'
})
export class UpdateAddress implements OnInit {

  constructor(
    @Inject(AddressService) private addressService: AddressService,
    @Inject(UserService) private userService: UserService,
    @Inject(CepService) private cepService: CepService,
    @Inject(Router) private router: Router
  ) {
    effect(() => {
      this.user.set(this.userService.user());
      if (this.user() === null) {
        return;
      }

      const path = `/users/${this.user()!.id}`;
      this.backButton.set([
        {
          type: "anchor",
          text: "Voltar",
          path,
        }
      ])
      this.address.set(this.addressService.address());
    });
  }
  user = signal<UserModel | null>(null);
  address = signal<AddressModel | null>(null);

  ngOnInit(): void {
      this.userService.findUserById();
      this.addressService.findAddressById();
  }

  backButton = signal<AnchorItem[]>([]);

  updateAddress(addressModel: AddressModel) {
    this.addressService.updateAddress(addressModel, () => {
      this.router.navigate([`/users/${this.user()?.id}`])
    })
  }

  public fillAddressInfo(models: Record<string, WritableSignal<any>>) {
    this.cepService.findAddressByCep(models);
  }

}
