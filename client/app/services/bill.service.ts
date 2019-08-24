import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bill } from '../shared/models/bill.model';

@Injectable()
export class BillService {

  constructor(private http: HttpClient) { }

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>('/api/bills');
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

  addBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>('/api/bill', bill);
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
