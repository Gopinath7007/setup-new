import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { WorkService } from '../services/work.service';
import { TaxService } from '../services/tax.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Work } from '../shared/models/work.model';
import { Tax } from '../shared/models/tax.model';

@Component({
  selector: 'app-works',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  work = new Work();
  works: Work[] = [];

  tax = new Tax();
  taxes: Tax[] = [];

  isLoading = true;
  isEditing = false;

  addWorkForm: FormGroup;
  name = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  total = new FormControl('', Validators.required);
  hsnId = new FormControl({}, Validators.required);

  constructor(
    private workService: WorkService,
    private taxService: TaxService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
    this.getWorks();
    this.getTaxes();
    this.addWorkForm = this.formBuilder.group({
      name: this.name,
      price: this.price,
      hsnId: this.hsnId,
      total: this.total
    });
  }

  getWorks() {
    this.workService.getWorks().subscribe(
      data => this.works = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getTaxes() {
    this.taxService.getTaxes().subscribe(
      data => this.taxes = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addWork() {
    this.workService.addWork(this.addWorkForm.value).subscribe(
      res => {
        this.works.push(res);
        this.addWorkForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  calculateGst() {

    let totalTax = this.addWorkForm.value.hsnId.cGst + this.addWorkForm.value.hsnId.sGst;
    var mrp =  (this.addWorkForm.value.price * totalTax /100) + this.addWorkForm.value.price;
    this.addWorkForm.patchValue({ total: mrp });
   
   console.log(this.addWorkForm.value);
    // return mrp * data.count;
  } 

  enableEditing(work: Work) {
    this.isEditing = true;
    this.work = work;
  }

  cancelEditing() {
    this.isEditing = false;
    this.work = new Work();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the works to reset the editing
    this.getWorks();
  }

  editWork(work: Work) {
    this.workService.editWork(work).subscribe(
      () => {
        this.isEditing = false;
        this.work = work;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteWork(work: Work) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.workService.deleteWork(work).subscribe(
        () => {
          const pos = this.works.map(elem => elem._id).indexOf(work._id);
          this.works.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
