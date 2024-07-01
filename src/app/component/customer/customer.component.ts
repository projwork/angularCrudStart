import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Customer, CustomerDisplay } from '../../_model/customer.model';
import { CustomerService } from '../../_service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../../material.module';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  customerlist: CustomerDisplay[] = [];
  displayedColumns: string[] = [
    'companyName',
    'enterpriseType',
    'tradeName',
    'startDate',
    'preferredLanguage',
    'action',
  ];
  datasource: any;
  _response: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.Loadcustomer();
  }

  Loadcustomer() {
    this.service.Getall().subscribe((item) => {
      this.customerlist = item.map((customer) => ({
        ...customer,
        startDate: customer.startDate.toString(),
        startDateDisplay:
          this.datePipe.transform(customer.startDate, 'yyyy-MM-dd') || '',
      }));
      this.datasource = new MatTableDataSource<CustomerDisplay>(
        this.customerlist
      );
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  functionedit(id: number) {
    this.router.navigateByUrl('/customer/edit/' + id);
    this.toastr.warning('User not having edit access', 'warning');
  }

  functiondelete(id: number) {
    if (confirm('Are you sure?')) {
      this.service.Deletecustomer(id).subscribe((item) => {
        this.toastr.success('Deleted successfully', 'Success');
        this.Loadcustomer();
      });
    }
  }
}
