import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { WorkService } from '../services/work.service';
import { BillService } from '../services/bill.service';
import { VehicleService } from '../services/vehicle.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Work } from '../shared/models/work.model';
import { Vehicle } from '../shared/models/vehicle.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  vehicle = new Vehicle();
  vehicles: Vehicle[] = [];
  isLoading = true;
  isEditing = false;

  addVehicleForm: FormGroup;
  vehicleNumber = new FormControl('', Validators.required);
  customerId = new FormControl('', Validators.required);

  constructor(
    private vehicleService: VehicleService,
    private billService: BillService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
    this.getVehicles();
    // this.getVehicles();
    this.addVehicleForm = this.formBuilder.group({
      vehicleNumber: this.vehicleNumber,
      customerId: this.customerId
    });
  }

  getVehicles() {
    this.vehicleService.getVehicles().subscribe(
      data => this.vehicles = data['data'],
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  // getVehicles() {
  //   let data = {
  //     key: 'vehicleNumber' 
  //   }
  //   this.billService.getDistinct(data).subscribe(
  //     data => console.log(data),
  //     error => console.log(error),
  //     () => this.isLoading = false
  //   );
  // }

  addVehicle() {
    this.vehicleService.addVehicle(this.addVehicleForm.value).subscribe(
      res => {
        this.vehicles.push(res);
        this.addVehicleForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(vehicle: Vehicle) {
    this.isEditing = true;
    this.vehicle = vehicle;
  }

  cancelEditing() {
    this.isEditing = false;
    this.vehicle = new Vehicle();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the works to reset the editing
    this.getVehicles();
  }

  editVehicle(vehicle: Vehicle) {
    this.vehicleService.editVehicle(vehicle).subscribe(
      () => {
        this.isEditing = false;
        this.vehicle = vehicle;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }
  deleteVehicle(vehicle: Vehicle) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.vehicleService.deleteVehicle(vehicle).subscribe(
        () => {
          const pos = this.vehicles.map(elem => elem._id).indexOf(vehicle._id);
          this.vehicles.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
