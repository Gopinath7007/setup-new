import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { WorkService } from '../services/work.service';
import { BillService } from '../services/bill.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Work } from '../shared/models/work.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  work = new Work();
  works: Work[] = [];
  isLoading = true;
  isEditing = false;

  addWorkForm: FormGroup;
  name = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);

  constructor(
    private workService: WorkService,
    private billService: BillService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
    this.getWorks();
    this.getVehicles();
    this.addWorkForm = this.formBuilder.group({
      name: this.name,
      price: this.price
    });
  }

  getWorks() {
    this.workService.getWorks().subscribe(
      data => this.works = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getVehicles() {
    let data = {
      key: 'vehicleNumber' 
    }
    this.billService.getDistinct(data).subscribe(
      data => console.log(data),
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
