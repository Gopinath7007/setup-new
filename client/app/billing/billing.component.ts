import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BillService } from '../services/bill.service';
import { WorkService } from '../services/work.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Bill } from '../shared/models/bill.model';
import { Work } from '../shared/models/work.model';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  bill = new Bill();
  bills: Bill[] = [];
  isLoading = true;
  isEditing = false;

  addBillForm = new FormGroup({
      amount: new FormControl('', Validators.required),
      works: new FormControl('')    
  });

  works = [];
  selectedWorks = [];
  constructor(
    private billService: BillService,
    private workService: WorkService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
    this.getBills();
    this.getWorks();  
    // this.addBillForm = this.formBuilder.group({
    //   amount: this.amount,
    //   works: this.works
    // });
  }

  getWorks() {
    this.workService.getWorks().subscribe( 
      data => this.works = data,
      error => this.isLoading = false
    )
  }

  getBills() {
    this.billService.getBills().subscribe(
      data => this.bills = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addBill() {
    console.log(this.addBillForm.value);
    this.billService.addBill(this.addBillForm.value).subscribe(
      res => {
        this.bills.push(res);
        this.addBillForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(bill: Bill) {
    this.isEditing = true;
    this.bill = bill;
  }

  cancelEditing() {
    this.isEditing = false;
    this.bill = new Bill();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the works to reset the editing
    this.getBills();
  }

  editBill(bill: Bill) {
    this.billService.editBill(bill).subscribe(
      () => {
        this.isEditing = false;
        this.bill = bill;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteBill(bill: Bill) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.billService.deleteBill(bill).subscribe(
        () => {
          const pos = this.bills.map(elem => elem._id).indexOf(bill._id);
          this.bills.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  addWork(work) {
    console.log(work)
      this.selectedWorks.push(work);
  }
}
