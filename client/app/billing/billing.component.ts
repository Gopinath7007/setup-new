import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material';
import { BillService } from '../services/bill.service';
import { WorkService } from '../services/work.service';
import { SpareService } from '../services/spare.service';
import { PdfService } from '../services/pdf.service';

import { ToastComponent } from '../shared/toast/toast.component';
import { Bill } from '../shared/models/bill.model';
import { Work } from '../shared/models/work.model';
import { Spare } from '../shared/models/spare.model';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import * as jsPDF from 'jspdf';  
// import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild('content') content: ElementRef;
  $subject: Subject<void> = new Subject<void>();

  @ViewChild(MatPaginator,  {static: false}) paginator: MatPaginator;
  events: string[] = [];

   
  bill = new Bill();
  bills: Bill[] = [];
  searchFilter: any = {};
  isLoading = true;
  isEditing = false;
  isBilling = true;  
  spareFilter: any;
  workFilter: any;
  isAdd = false;
  filteredSpares = [];
  filteredWorks = [];
  total = 0;    
  addBillForm = new FormGroup({
      amount: new FormControl('', Validators.required),
      works: new FormControl([]),    
      spares: new FormControl([]),    
      customerName: new FormControl('', Validators.required),  
      customerAddress: new FormControl('', Validators.required),  
      vehicleNumber: new FormControl('', Validators.required),    
      phoneNumber: new FormControl('', Validators.required),    
      gstNumber: new FormControl(''),   
      gstStatus: new FormControl('', Validators.required),   
      amountPaid: new FormControl('', Validators.required),   
      status: new FormControl('', Validators.required), 
      _id: new FormControl('')    
  });
  addWorkForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
  });
  spare = new Spare();
  spares: Spare[] = [];

  works = [];
  selectedWorks = [];
  selectedSpares = [];

  constructor(
    private billService: BillService,
    private workService: WorkService,
    private spareService: SpareService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent,
    public pdfService: PdfService
  ) { 
    this.$subject.pipe(debounceTime(5000), distinctUntilChanged());
  }

  ngOnInit() {
    this.searchFilter = {
      page: 0,
      count: 5,
      total: 10,
      search: '',
      status: 'paid',
      from: new Date(),
      vehicleNumber: '',      
      to: new Date()
    };
    
    this.spareFilter = {
      page: 0,
      count: 100,      
      search: ''
    }; 
    
    this.workFilter = {
      page: 0,
      count: 100,      
      search: ''
    };
    this.searchFilter.from.setDate(this.searchFilter.from.getDate() -30);
    this.searchFilter
    this.getBills();
    this.getWorks();  
    this.getSpares();  
    this.getCounts();
  }

  onSomeMethod(event: string) {
    this.$subject.next(this.runMethod(event));
  }

  runMethod(event: any) {
    // do stuff
    console.log(event);
  }
  ngAfterViewInit() {
    this.paginator.page.subscribe(
       (event) => this.handlePage(event)
  );}
  handlePage(e: any) {
    // this.currentPage = e.pageIndex;
    // this.pageSize = e.pageSize;
    // this.iterator();
    console.log(e.pageIndex);
    // console.log(e.pageIndex.pageIndex);
    this.searchFilter.page = e.pageIndex;
    this.getBills();
    this.getCounts();
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    console.log(this.events);
  }

  getWorks() {
    this.workService.getWorks(this.workFilter).subscribe( 
      data => {
        console.log(data)
        this.filteredWorks = data['data']
      },
      error => this.isLoading = false
    )
  }
  getCounts() {
    this.billService.getCounts().subscribe( 
      data => {        
        // this.searchFilter.total = this.searchFilter.total;
        this.searchFilter.total = data.bills;
      },
      error => {
        console.log("Pagination Helps");
      }
    )
  }
  makePdf() {
  let doc = new jsPDF();
    //doc.addHTML(this.content.nativeElement, function() {
     //  doc.save("obrz.pdf");
    //});
  const elementToPrint = document.getElementById('foo'); 
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.addHTML(elementToPrint, () => {
      pdf.save('web.pdf');
  }); 

  }  
  getSpares() {
    this.spareService.getSpares(this.spareFilter).subscribe( 
      data => this.filteredSpares = data['data'],
      // data => console.log(data),
      error => this.isLoading = false
    )
  }

  downloadBill(bill) {
    this.billService.downloadBill(this.addBillForm.value).subscribe(
      data => { 

          // this.bills = data;
          console.log(data);
          // this.billService.downloadBill(this.bills[0]);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }  
  filterSpares(searchText) {
    this.filteredSpares = this.spares.filter(item=> item['name'].toLowerCase().includes(searchText.toLowerCase()));
  }
  filterWorks(searchText) {
    this.filteredWorks = this.works.filter(item=> item['name'].toLowerCase().includes(searchText.toLowerCase()));
  }
  getBills() {
    this.isLoading = true;
    this.billService.getBills(this.searchFilter).subscribe(
      result => { 
          this.isLoading = false;
          this.bills = result['data'];
          this.searchFilter.total = result['count'];
          console.log(this.bills);
         
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addBill() {
    //this.makePdf();
    this.downloadBill(this.bills[0]);
    if(this.addBillForm.value._id == "") {
    let newBill = this.addBillForm.value;
    delete newBill._id;
      
    this.addBillForm.patchValue({ vehicleNumber: this.addBillForm.value.vehicleNumber.toUpperCase() });
    this.addBillForm.patchValue({ gstNumber: this.addBillForm.value.gstNumber.toUpperCase() });
    this.addBillForm.controls['works'].setValue(this.selectedWorks);
    console.log(this.addBillForm.value);
    // this.addBillForm.controls['dept'].setValue(selected.id);

    this.isLoading = true;  
    this.billService.addBill(newBill).subscribe(
      res => {
        this.isLoading = false;
      console.log(res);
        this.getBills();
        //this.addBillForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error =>{ 
        this.isLoading = false;
        console.log(error)
      } 
    );
    }  else {
        this.editBill(this.addBillForm.value);
    } 
    
  }
  resetForm(state) {

    this.isAdd= !state;
    // this.addBillForm.reset();
    this.addBillForm.patchValue({
      amount: 0,
      works: [],    
      spares: [],    
      customerName: '',  
      customerAddress: '',  
      vehicleNumber: '',    
      phoneNumber: '',    
      gstNumber: '',   
      gstStatus: '',   
      amountPaid: 0,   
      status: '', 
      _id: ''
    });
  }

  enableEditing(bill: Bill) {
    this.addBillForm.setValue({
      amount: bill['amount'],
      works: bill['works'],    
      spares: bill['spares'],    
      customerName: bill['customerName'],    
      customerAddress: bill['customerAddress'],    
      vehicleNumber: bill['vehicleNumber'],    
      phoneNumber: bill['phoneNumber'],    
      gstNumber: bill['gstNumber'],   
      gstStatus: bill['gstStatus'],   
      amountPaid: bill['amountPaid'],   
      status: bill['status'],
      _id: bill['_id']    
    }) 
    this.selectedSpares = bill['spares'];
    this.selectedWorks = bill['works'];
    this.isEditing = false;  
    this.isBilling = true;  
    this.isAdd = true;
    //this.isEditing = true;
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
        this.getBills();
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  generateBill(bill: Bill) {
    this.pdfService.generatePdf(bill);
    
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
    

      //delete work._id; 
      const isPresent = this.addBillForm.value.works.filter(item => item._id === work._id).length;    
      if(isPresent < 1) {
         work.count = 1;
         this.selectedWorks.push(work);
         this.addBillForm.patchValue({ works: this.selectedWorks });
         this.addBillForm.patchValue({ amount: this.getTotal(this.addBillForm.value.works) });
         console.log(this.addBillForm.value.works);
         this.setBillAmount();  
      } else {
        this.toast.setMessage(work.name +' already added in the bill.', 'warning');
      }
       

  }  
  getRounded(value) {
    Math.round(value)
  }
  sendPdf(bill) {
    this.pdfService.sendPdf(bill)
  }
  setBillAmount() {
      var total = 0;
      this.addBillForm.value.works.map( workItem => total = total + (workItem.total * workItem.count));      
      this.addBillForm.value.spares.map( spareItem => total = total + (spareItem.total * spareItem.count) );
      this.total = total;  
      this.addBillForm.value.amount = total;
      this.addBillForm.controls['amount'].setValue(Math.round(total));
  }

  addSpare(spare) {
    
    console.log(spare)
      // delete spare._id;

      const isPresent = this.addBillForm.value.spares.filter(item => item._id === spare._id).length;    
      if(isPresent < 1) {  
        spare.count = 1;  
        this.selectedSpares.push(spare);
        this.addBillForm.patchValue({ spares: this.selectedSpares });
        this.addBillForm.patchValue({ amount: this.getTotal(this.addBillForm.value.spares) });
        this.setBillAmount()  
        } else {
          this.toast.setMessage(spare.name + ' already added in bill.', 'warning');
        }
  }

  toggleCount(index, type, key) {
    let data = this.addBillForm.value[key]; 
    if(type === 'add') {
      data[index].count += 1;    
    } else if(type === 'minus'){
      data[index].count -= 1;    
    }
    data[index].price * data[index].count;
    console.log(data); 
    this.addBillForm.patchValue({ key: data });
    this.setBillAmount();
  }
  addNewWork() {
      // delete work._id;
      if(this.addWorkForm.valid) {
              this.workService.addWork(this.addWorkForm.value).subscribe(
                res => {
                  this.works.push(res);
                  this.addWorkForm.reset();
                  this.toast.setMessage('item added successfully.', 'success');
                },
                error => console.log(error)
              );
          this.selectedWorks.push(this.addWorkForm.value);
          this.addBillForm.patchValue({ works: this.selectedWorks });
          this.addBillForm.patchValue({ amount: this.getTotal(this.addBillForm.value.works) });

          this.addWorkForm.reset();            
          this.setBillAmount();
      } 

  }

  removeWork(index) {
    this.selectedWorks.splice(index,1);
    this.addBillForm.patchValue({ works: this.selectedWorks });
    this.addBillForm.patchValue({ amount: this.getTotal(this.addBillForm.value.works) });
    this.setBillAmount()      
  } 

  removeSpare(index) {
    this.selectedSpares.splice(index,1);
    this.addBillForm.patchValue({ spares: this.selectedSpares });
    this.addBillForm.patchValue({ amount: this.getTotal(this.addBillForm.value.spares) });
    this.setBillAmount()      
  }  
  getTotal(items) {
      let total = 0;
      // items.map(item => total = item.price + total);
      return total;
  }
}
