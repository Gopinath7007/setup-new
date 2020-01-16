import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bill } from '../shared/models/bill.model';

@Injectable()
export class BillService {

  constructor(private http: HttpClient) { }

  getBills(data): Observable<Bill[]> {
    // let date = new Date;
    const { 
      date, 
      page, 
      count, 
      search,
      status,
      from,
      to 
    } = data;

    const fromDate = `${from.getFullYear()}/${from.getMonth()+1}/${from.getDay()+1}`;
    const toDate = `${to.getFullYear()}/${to.getMonth()+1}/${to.getDay()+1}`;
    return this.http.get<Bill[]>('/api/bills?date='+date+'&page='+ page +'&count='+count+'&search='+ search + '&status='+status +'&from='+from+'&to='+to);
  }

  // getDistinct(key): Observable<Bill[]> {
  //   return this.http.get<Bill[]>('/api/distinct/key='+key);
  // }
  getDistinct(key): Observable<any> {
    console.log(key)
    return this.http.post(`/api/distinct`, key);
  }

  countBills(): Observable<number> {
    return this.http.get<number>('/api/bills/count');
  }
  getCounts(): Observable<any> {
    return this.http.get<any>('/api/bills/getCounts');
  }

  addBill(bill: Bill): Observable<Bill> {
    
    return this.http.post<Bill>('/api/bill', bill);
  }

  
  downloadBill(bill: Bill): Observable<Bill> {
    
    return this.http.post<Bill>('/api/downloadBill', bill);
  }

  getBill(bill: Bill): Observable<Bill> {
    return this.http.get<Bill>(`/api/bill/${bill._id}`);
  }

  editBill(bill: Bill): Observable<any> {
    return this.http.put(`/api/bill/${bill._id}`, bill, { responseType: 'text' });
  }

  deleteBill(bill: Bill): Observable<any> {
    return this.http.delete(`/api/bill/${bill._id}`, { responseType: 'text' });
  }

}
