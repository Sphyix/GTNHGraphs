import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { DimData } from '../models/dimdata';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http: HttpClient) { 
  }


  getDelta(): Observable<DimData[]> {
    return this.http.get<DimData[]>('https://localhost:44388/data/delta')
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getEpsilon(): Observable<DimData[]> {
    return this.http.get<DimData[]>('https://localhost:44388/data/epsilon')
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getEta(): Observable<DimData[]> {
    return this.http.get<DimData[]>('https://localhost:44388/data/eta')
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getZeta(): Observable<DimData[]> {
    return this.http.get<DimData[]>('https://localhost:44388/data/zeta')
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
