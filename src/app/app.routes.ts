import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CreateUser } from './pages/create-user/create-user';
import { UserDetails } from './pages/user-details/user-details';
import { UpdateUser } from './pages/update-user/update-user';
import { CreateAddress } from './pages/create-address/create-address';
import { UpdateAddress } from './pages/update-address/update-address';

export const routes: Routes = [
    {
        path: "home",
        component: Home,
        title: "Início"
    },
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    }, 
    {
        path: "users/create",
        title: "Criar usuário",
        component: CreateUser
    }, 
    {
        path: "users/:id",
        title: "Detalhes do usuário",
        component: UserDetails
    }, 
    {
        path: "users/:id/edit",
        title: "Editar usuário",
        component: UpdateUser
    },
    {
        path: "users/:id/addresses/create",
        title: "Criar endereço",
        component: CreateAddress
    },
    {
        path: "users/:id/addresses/:addressId/edit",
        title: "Editar endereço",
        component: UpdateAddress
    }
];
