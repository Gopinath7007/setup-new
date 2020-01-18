import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material';

import { WorkService } from '../services/work.service';
import { TaxService } from '../services/tax.service';
import { BillService } from '../services/bill.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Work } from '../shared/models/work.model';
import { Tax } from '../shared/models/tax.model';

@Component({
  selector: 'app-works',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  @ViewChild(MatPaginator,  {static: false}) paginator: MatPaginator;
  events: string[] = [];

  work = new Work();
  works: Work[] = [];

  tax = new Tax();
  taxes: Tax[] = [];

  isLoading = true;
  isEditing = false;

  searchFilter = { };

  addWorkForm: FormGroup;
  name = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  total = new FormControl('', Validators.required);
  hsnId = new FormControl({}, Validators.required);

  constructor(
    private workService: WorkService,
    private taxService: TaxService,
    private billService: BillService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
    this.searchFilter = {
      page: 0,
      count: 5,
      total: 10,
      search: '',
    }; 

    this.getWorks();
    this.getTaxes();
    this.addWorkForm = this.formBuilder.group({
      name: this.name,
      price: this.price,
      hsnId: this.hsnId,
      total: this.total
    });

    
  }
  ngAfterViewInit() {
    this.paginator['page'].subscribe(
       (event) => this.handlePage(event)
  );}
  handlePage(e: any) {

    // alert()
    // this.currentPage = e.pageIndex;
    // this.pageSize = e.pageSize;
    // this.iterator();
    console.log(e.pageIndex);
    // console.log(e.pageIndex.pageIndex);
    this.searchFilter['page'] = e.pageIndex;
    this.getWorks();
    // this.getCounts();
  }
  getCounts() {
    this.billService.getCounts().subscribe( 
      data => {        
        // this.searchFilter['total'] = data.works;
        console.log(data)
      },
      error => {
        console.log("Pagination Helps");
      }
    )
  }
  getWorks() {
    this.workService.getWorks(this.searchFilter).subscribe(
      data => { 
        console.log(data)
        this.works = data['data'];
        this.searchFilter['total'] = data['count'];
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
 

  getTaxes() {
    this.taxService.getTaxes().subscribe(      
      data => { 
        this.taxes = data['data'];
        this.searchFilter['total'] = data['count'];
        
      },
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
