import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Spare } from '../shared/models/spare.model';

@Injectable()
export class SpareService {

  constructor(private http: HttpClient) { }

  getSpares(data): Observable<any> {
    const { 
      page, 
      count, 
      search
    } = data;
    console.log(data)
    return this.http.get<any>('/api/getSpares?page='+ page + '&count='+ count + '&search=' + search);
  }

  countSpares(): Observable<number> {
    return this.http.get<number>('/api/spares/count');
  }

  addSpare(spare: Spare): Observable<Spare> {
    return this.http.post<Spare>('/api/spare', spare);
  }

  getSpare(spare: Spare): Observable<Spare> {
    return this.http.get<Spare>(`/api/spare/${spare._id}`);
  }

  editSpare(spare: Spare): Observable<any> {
    return this.http.put(`/api/spare/${spare._id}`, spare, { responseType: 'text' });
  }

  deleteSpare(spare: Spare): Observable<any> {
    return this.http.delete(`/api/spare/${spare._id}`, { responseType: 'text' });
  }

}
