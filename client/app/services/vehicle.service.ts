import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vehicle } from '../shared/models/vehicle.model';

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>('/api/vehicles');
  }

  countVehicles(): Observable<number> {
    return this.http.get<number>('/api/vehicles/count');
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>('/api/vehicle', vehicle);
  }

  getVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.get<Vehicle>(`/api/vehicles/${vehicle._id}`);
  }

  editVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.put(`/api/vehicle/${vehicle._id}`, vehicle, { responseType: 'text' });
  }

  deleteVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.delete(`/api/vehicle/${vehicle._id}`, { responseType: 'text' });
  }

}
