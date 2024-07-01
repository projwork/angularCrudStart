import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CustomerComponent } from './component/customer/customer.component';
import { AddcustomerComponent } from './component/addcustomer/addcustomer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer/add', component: AddcustomerComponent },
  { path: 'customer/edit/:id', component: AddcustomerComponent },
];
