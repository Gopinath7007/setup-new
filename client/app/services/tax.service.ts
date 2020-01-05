import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tax } from '../shared/models/tax.model';

@Injectable()
export class TaxService {

  constructor(private http: HttpClient) { }

  getTaxes(): Observable<Tax[]> {
    return this.http.get<Tax[]>('/api/taxes');
  }

  countTaxes(): Observable<number> {
    return this.http.get<number>('/api/taxes/count');
  }

  addTax(tax: Tax): Observable<Tax> {
    return this.http.post<Tax>('/api/tax', tax);
  }

  getTax(tax: Tax): Observable<Tax> {
    return this.http.get<Tax>(`/api/tax/${tax._id}`);
  }

  editTax(tax: Tax): Observable<any> {
    return this.http.put(`/api/tax/${tax._id}`, tax, { responseType: 'text' });
  }

  deleteTax(tax: Tax): Observable<any> {
    return this.http.delete(`/api/tax/${tax._id}`, { responseType: 'text' });
  }

}
