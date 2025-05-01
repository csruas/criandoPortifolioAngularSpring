import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Marcas } from '../models/marcas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {


   http = inject(HttpClient);
    API = "http://localhost:8080/api/marcas";
  
    constructor() { }
  
    save(marca: Marcas): Observable<string> {
      return this.http.post<string>(this.API+"/save", marca, {responseType: 'text' as 'json'});
    }
  
    update(marca: Marcas, id: number): Observable<string> {
      return this.http.put<string>(this.API+"/update/"+ id, marca, {responseType: 'text' as 'json'});
    }
  
    findById(id: number): Observable<Marcas[]> {
      return this.http.get<Marcas[]>(this.API+"/findAll"+id);
    }
  
    findAll(): Observable<Marcas[]> {
      return this.http.get<Marcas[]>(this.API+"/findAll");
    }
  
    delete(id: number): Observable<string> {
      return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
    }
}
