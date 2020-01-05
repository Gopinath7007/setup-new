import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TaxService } from '../services/tax.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Tax } from '../shared/models/tax.model';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {

  tax = new Tax();
  taxes: Tax[] = [];
  isLoading = true;
  isEditing = false;

  addTaxForm: FormGroup;
  name = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  hsnId = new FormControl('', Validators.required);
  cGst = new FormControl('', Validators.required);
  sGst = new FormControl('', Validators.required);
  mrp = new FormControl('', Validators.required);

  constructor(
    private taxService: TaxService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
    this.getTaxes();
    this.addTaxForm = this.formBuilder.group({
      name: this.name,
      price: this.price,
      hsnId: this.hsnId,
      cGst: this.cGst,
      sGst: this.sGst,
      mrp: this.mrp
    });
  }

  getTaxes() {
    this.taxService.getTaxes().subscribe(
      data => this.taxes = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  calculateGst() {
    let totalTax = this.addTaxForm.value.cGst + this.addTaxForm.value.sGst;
    this.addTaxForm.patchValue({ mrp: (this.addTaxForm.value.price * totalTax /100) + this.addTaxForm.value.price });
  }    
  addTax() {
    this.taxService.addTax(this.addTaxForm.value).subscribe(
      res => {
        this.taxes.push(res);
        this.addTaxForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(tax: Tax) {
    this.isEditing = true;
    this.tax = tax;
  }

  cancelEditing() {
    this.isEditing = false;
    this.tax = new Tax();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the works to reset the editing
    this.getTaxes();
  }

  editTax(tax: Tax) {
    this.taxService.editTax(tax).subscribe(
      () => {
        this.isEditing = false;
        this.tax = tax;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteWork(tax: Tax) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.taxService.deleteTax(tax).subscribe(
        () => {
          const pos = this.taxes.map(elem => elem._id).indexOf(tax._id);
          this.taxes.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
