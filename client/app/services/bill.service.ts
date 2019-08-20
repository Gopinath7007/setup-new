import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bill } from '../shared/models/bill.model';

@Injectable()
export class BillService {

  constructor(private http: HttpClient) { }

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>('/api/works');
  }

  countBills(): Observable<number> {
    return this.http.get<number>('/api/works/count');
  }

  addBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>('/api/bill', Bill);
  }

  getWork(bill: Bill): Observable<Bill> {
    return this.http.get<Bill>(`/api/bill/${bill._id}`);
  }

  editWork(bill: Bill): Observable<any> {
    return this.http.put(`/api/bill/${bill._id}`, bill, { responseType: 'text' });
  }

  deleteWork(bill: Bill): Observable<any> {
    return this.http.delete(`/api/bill/${bill._id}`, { responseType: 'text' });
  }

}
