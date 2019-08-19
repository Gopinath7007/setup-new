import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Work } from '../shared/models/work.model';

@Injectable()
export class WorkService {

  constructor(private http: HttpClient) { }

  getWorks(): Observable<Work[]> {
    return this.http.get<Work[]>('/api/work');
  }

  countWorks(): Observable<number> {
    return this.http.get<number>('/api/work/count');
  }

  addWork(work: Work): Observable<Work> {
    return this.http.post<Work>('/api/work', work);
  }

  getWork(work: Work): Observable<Work> {
    return this.http.get<Work>(`/api/work/${work._id}`);
  }

  editWork(work: Work): Observable<any> {
    return this.http.put(`/api/work/${work._id}`, work, { responseType: 'text' });
  }

  deleteWork(work: Work): Observable<any> {
    return this.http.delete(`/api/work/${work._id}`, { responseType: 'text' });
  }

}
