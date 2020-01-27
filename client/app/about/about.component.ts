import { Component } from '@angular/core';

import { SpareService } from '../services/spare.service';
import { Spare } from '../shared/models/spare.model';

import { WorkService } from '../services/work.service';
import { Work } from '../shared/models/work.model';

import { BillService } from '../services/bill.service';
import { Bill } from '../shared/models/bill.model';

import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../shared/models/vehicle.model';

import { EChartOption } from 'echarts';
 
// ...
 

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  xAxis = {
    keys: [],
    data: []
  };
  
  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  }
  

  totalItems = {
    bills: 0,
    spares: 0, 
    vehicles: 0,
    works: 0
  };
  
  isLoading = false;

  constructor(
    private spareService: SpareService,
    private workService: WorkService,
    private billService: BillService,
    private vehicleService: VehicleService
  ) { 
    // this.getData();

  }

  ngOnInit() {
  
    this.billService.getCounts().subscribe(
      data => {
        this.totalItems = data 
        data.map((item=> {
          this.xAxis.data = item.count;
        }))

        this.xAxis.keys = Object.keys(data);
        // this.chartOption  = ({
        //   xAxis: {
        //     type: 'category',
        //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        //   },
        //   yAxis: {
        //     type: 'value'
        //   },
        //   series: [{
        //     data: [820, 932, 901, 934, 1290, 1330, 1320],
        //     type: 'pie'
        //   }]
        // })
      },
      error => console.log(error),
      () => this.isLoading = false
    ); 
  }

   getData() {
    // this.spareService.getSpares().subscribe(
    //   data => this.spares = data,
    //   error => console.log(error),
    //   () => this.isLoading = false
    // );    
    // this.workService.getWorks().subscribe(
    //   data => this.works = data,
    //   error => console.log(error),
    //   () => this.isLoading = false
    // );    
    // this.billService.getBills(this.searchFilter).subscribe(
    //   data => this.bills = data,
    //   error => console.log(error),
    //   () => this.isLoading = false
    // );    
    // this.vehicleService.getVehicles().subscribe(
    //   data => this.vehicles = data,
    //   error => console.log(error),
    //   () => this.isLoading = false
    // );
  }

}
