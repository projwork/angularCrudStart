import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../../_model/customer.model';
import { CustomerService } from '../../_service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  customerlist!: Customer[];
  displayedColumns: string[] = [
    'companyName',
    'enterpriseType',
    'tradeName',
    'startDate',
    'preferredLanguage',
  ];
  datasource: any;
  _response: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: CustomerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // _custform = this.builder.group({
  //   companyName: this.builder.control('', Validators.required),
  // });

  ngOnInit(): void {
    this.Loadcustomer();
  }

  Loadcustomer() {
    this.service.Getall().subscribe((item) => {
      this.customerlist = item;
      this.datasource = new MatTableDataSource<Customer>(this.customerlist);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }
}
