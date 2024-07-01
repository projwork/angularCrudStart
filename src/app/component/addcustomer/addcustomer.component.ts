import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Customer, CustomerDisplay } from '../../_model/customer.model';
import { CustomerService } from '../../_service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-addcustomer',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.scss',
})
export class AddcustomerComponent implements OnInit {
  _response: any;
  title = 'Add Customer';
  id = 0;
  isedit = false;
  editdata!: Customer;
  customerlist: CustomerDisplay[] = [];

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private service: CustomerService,
    private act: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.id = this.act.snapshot.paramMap.get('id') as number;
    this.act.params.subscribe((params) => {
      if (params['id']) {
        this.isedit = true;
        this.id = +params['id'];
        this.title = 'Edit Customer';
        // this.customerform.controls['id'].disable();
        this.service.GetbyId(this.id).subscribe((item) => {
          this.editdata = item;
          this.customerform.setValue({
            companyName: this.editdata.companyName,
            companyNameLocal: this.editdata.companyNameLocal,
            companyNameAmharic: this.editdata.companyNameAmharic,
            enterpriseType: this.editdata.enterpriseType,
            tradeName: this.editdata.tradeName,
            tradeNameLocal: this.editdata.tradeNameLocal,
            tradeNameAmharic: this.editdata.tradeNameAmharic,
            startDate: this.editdata.startDate.toString(),
            preferredLanguage: this.editdata.preferredLanguage,
          });
        });
      }
    });
  }

  customerform = this.builder.group({
    companyName: this.builder.control('', Validators.required),
    companyNameLocal: this.builder.control('', Validators.required),
    companyNameAmharic: this.builder.control('', Validators.required),
    enterpriseType: this.builder.control('', Validators.required),
    tradeName: this.builder.control('', Validators.required),
    tradeNameLocal: this.builder.control(''),
    tradeNameAmharic: this.builder.control('', Validators.required),
    startDate: this.builder.control(''),
    preferredLanguage: this.builder.control('', Validators.required),
  });

  Savecustomer() {
    console.log('Customer save form method reached');
    console.log('Form valid:', this.customerform.valid);
    console.log('Form values:', this.customerform.value);
    console.log('Form errors:', this.customerform.errors);

    Object.keys(this.customerform.controls).forEach((key) => {
      const control = this.customerform.get(key);
      console.log(`${key} valid:`, control?.valid);
      console.log(`${key} errors:`, control?.errors);
    });
    if (this.customerform.valid) {
      const startDateValue = this.customerform.value.startDate;
      console.log(startDateValue);
      let startDate: Date | null = null;

      if (startDateValue) {
        // Convert the string to a Date object
        startDate = new Date(startDateValue);
      }
      console.log(startDate);
      let _obj: Customer = {
        id: 0,
        companyName: this.customerform.value.companyName as string,
        companyNameLocal: this.customerform.value.companyNameLocal as string,
        companyNameAmharic: this.customerform.value
          .companyNameAmharic as string,
        enterpriseType: this.customerform.value.enterpriseType as string,
        tradeName: this.customerform.value.tradeName as string,
        tradeNameLocal: this.customerform.value.tradeNameLocal as string,
        tradeNameAmharic: this.customerform.value.tradeNameAmharic as string,
        startDate: startDate!,
        preferredLanguage: this.customerform.value.preferredLanguage as string,
      };
      console.log(_obj);
      if (!this.isedit) {
        this.service.Createcustomer(_obj).subscribe((item) => {
          this._response = item;
          if (this._response.id !== 0) {
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/customer');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        });
      } else {
        console.log('Update reached');
        console.log(this.id);
        _obj.id = this.id;
        this.service.Updatecustomer(_obj.id, _obj).subscribe((item) => {
          console.log('Update response: ');
          console.log(item);
          this.toastr.success('Updated successfully', 'Success');
          this.router.navigateByUrl('/customer');
          // this._response = item;
          // if (this._response.result === 'pass') {
          //   this.toastr.success('Updated successfully', 'Success');
          //   this.router.navigateByUrl('/customer');
          // } else {
          //   this.toastr.error('Due to:' + this._response.message, 'Failed');
          // }
        });
      }
    }
  }
}
