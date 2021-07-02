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


  getHeroes(): Observable<DimData[]> {
    return this.http.get<DimData[]>('https://localhost:44388/data/delta')
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
