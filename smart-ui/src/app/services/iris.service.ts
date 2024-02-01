import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const IRIS_API = '/smart/fhir/r5/';

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/fhir+json',
        'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class IrisService {

  constructor(private http: HttpClient) {}

  savePatient(patient: any): Observable<any> {
    return this.http.post<Response>(
      IRIS_API + 'Patient', patient, httpOptions
    )
  }

  getPatient(): Observable<any> {
    return this.http.get<Response>(
      IRIS_API + 'Patient', httpOptions
    )
  }
}
