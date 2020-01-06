import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SpareService } from '../services/spare.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Spare } from '../shared/models/spare.model';
import { TaxService } from '../services/tax.service';
import { Tax } from '../shared/models/tax.model';

@Component({
  selector: 'app-spares',
  templateUrl: './spares.component.html',
  styleUrls: ['./spares.component.scss']
})

export class SparesComponent implements OnInit {

  spare = new Spare();
  spares: Spare[] = [];
  tax = new Tax();
  taxes: Tax[] = [];
  isLoading = true;
  isEditing = false;
  isAdd = false;  
  addSpareForm: FormGroup;
  name = new FormControl('',Validators.required);
  price = new FormControl('', Validators.required);
  hsnId = new FormControl('', Validators.required); 
  availableItems = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  brand = new FormControl('', Validators.required);

  constructor(
    private spareService: SpareService,
    private taxService: TaxService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
    this.getSpares();
    this.getTaxes();
    this.addSpareForm = this.formBuilder.group({
      name: this.name,
      price: this.price,
      availableItems: this.availableItems,
      hsnId: this.hsnId,
      type: this.type,
      brand: this.brand
    });
  }
  
  getTaxes() {
    this.taxService.getTaxes().subscribe(
      data => this.taxes = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getSpares() {
    this.spareService.getSpares().subscribe(
      data => this.spares = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addSpare() {
    this.spareService.addSpare(this.addSpareForm.value).subscribe(
      res => {
        this.spares.push(res);
        this.addSpareForm.reset();
        console.log(this.spares);
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(spare: Spare) {
    this.isEditing = true;
    this.spare = spare;
  }

  cancelEditing() {
    this.isEditing = false;
    this.spare = new Spare();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the works to reset the editing
    this.getSpares();
  }
  
  editSpare(spare: Spare) {
    this.spareService.editSpare(spare).subscribe(
      () => {
        this.isEditing = false;
        this.spare = spare;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  updateItem(item, value) {
    item.availableItems += value;
    this.editSpare(item);   
  }

  deleteSpare(spare: Spare) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.spareService.deleteSpare(spare).subscribe(
        () => {
          const pos = this.spares.map(elem => elem._id).indexOf(spare._id);
          this.spares.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}
