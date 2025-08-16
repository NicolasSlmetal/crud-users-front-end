import { Component, effect, Inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user-service/user-service';
import { ButtonGroup } from '../../components/button-group/button-group';
import { ButtonItem } from '../../interfaces/button-item';
import { AnchorItem } from '../../interfaces/anchor-item';
import { CompleteUserModel } from '../../models/users/complete-user-model';
import { Router } from '@angular/router';
import { ConfirmModal } from '../../components/confirm-modal/confirm-modal';
import { AddressCardContainer } from '../../components/address-card-container/address-card-container';
import { AddressModel } from '../../models/addresses/address-model';
import { AddressService } from '../../services/address-service/address-service';
import { PhonePipe } from '../../pipes/phone-pipe/phone-pipe';

@Component({
  selector: 'app-user-details',
  imports: [ButtonGroup, ConfirmModal, AddressCardContainer, PhonePipe],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css'
})
export class UserDetails implements OnInit {

  constructor(
    @Inject(UserService) public userService: UserService,
    @Inject(AddressService) private addressService: AddressService,
    @Inject(Router) private router: Router
  ) {
    effect(() => {
      this.user.set(this.userService.user());
      const userPath = `/users/${this.userService.user()?.id}`;
      
      this.userButtons.set([
        {
          type: "anchor",
          text: "Editar",
          path: `${userPath}/edit`,
        },
        {
          type: "anchor",
          text: "Adicionar endereço",
          path: `${userPath}/addresses/create`
        },
        {
          type: "button",
          text: "Deletar",
          extraClasses: ["danger"],
          callback: () => this.showDeleteModalForUser()
        }
      ]);
    
      if (this.user() !== null) {
        this.addresses.set(this.user()!.addresses);
      }
    });
  }
  modalTitle = signal<string>("");
  modalText = signal<string>("");
  modalAction = signal<() => void>(() => {});
  addresses = signal<AddressModel[]>([]);
  deleteCallback = this.showDeleteModalForUser;

  isOpenToDelete = signal<boolean>(false);

  ngOnInit(): void {
    
    this.userService.findUserById();
    
  }

  showDeleteModalForUser() {
    this.modalTitle.set("Deletar usuário");
    this.modalText.set(`Tem certeza que deseja deletar o usuário ${this.user()?.name}?`)
    this.modalAction.set(() => this.deleteUser());
    this.isOpenToDelete.set(true);
  }

  showDeleteModalForAddress(address: AddressModel) {
    this.modalTitle.set("Deletar endereço")
    this.modalText.set(`Tem certeza que deseja deletar o endereço com CEP ${address.cep}?`);
    this.modalAction.set(() => this.deleteAddress(address));
    this.isOpenToDelete.set(true);
  }

  deleteAddress(address: AddressModel) {
    this.closeConfirmDeleteModal();
    this.addressService.deleteAddress(address, () => {
      
      this.user.set(this.userService.user());
      this.addresses.update((addresses) => addresses.filter(addressOnSignal => addressOnSignal.id !== address.id));
      this.router.navigate([`/users/${this.user()?.id}`])
    });
  }

  deleteUser() {
    this.closeConfirmDeleteModal();
    this.userService.deleteUser(() => this.router.navigate(["/home"]));
  }

  closeConfirmDeleteModal() {
    this.isOpenToDelete.set(false);
  }

  user = signal<CompleteUserModel | null>(null);
  shouldShowMessage = signal<boolean>(false);

  backButton : AnchorItem = {
    type: "anchor",
    text: "Voltar",
    path: "/home"
  }
  userButtons = signal<Array<ButtonItem | AnchorItem>>([]); 
}
