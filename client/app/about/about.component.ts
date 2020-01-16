import { Component } from '@angular/core';

import { SpareService } from '../services/spare.service';
import { Spare } from '../shared/models/spare.model';

import { WorkService } from '../services/work.service';
import { Work } from '../shared/models/work.model';

import { BillService } from '../services/bill.service';
import { Bill } from '../shared/models/bill.model';

import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../shared/models/vehicle.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  
  spares = [];
  works = [];
  bills = [];		
  searchFilter = {};
  vehicles = [];
  isLoading = false;

  constructor(
    private spareService: SpareService,
    private workService: WorkService,
    private billService: BillService,
    private vehicleService: VehicleService,
  ) { 
  	// this.getData();
  }

   getData() {
    this.spareService.getSpares().subscribe(
      data => this.spares = data,
      error => console.log(error),
      () => this.isLoading = false
    );    
    this.workService.getWorks().subscribe(
      data => this.works = data,
      error => console.log(error),
      () => this.isLoading = false
    );    
    this.billService.getBills(this.searchFilter).subscribe(
      data => this.bills = data,
      error => console.log(error),
      () => this.isLoading = false
    );    
    this.vehicleService.getVehicles().subscribe(
      data => this.vehicles = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
