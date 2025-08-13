import { AddressModel } from "../addresses/address-model";
import { UserModel } from "./user-model";

export interface CompleteUserModel extends UserModel {
    addresses: AddressModel[]
}