import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Acessorio } from '../models/acessorio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcessorioService {

  constructor() { }
   http = inject(HttpClient);
      API = "http://localhost:8080/api/acessorio";



      save(acessorio: Acessorio): Observable<string> {
        return this.http.post<string>(this.API+"/save", acessorio, {responseType: 'text' as 'json'});
      }

      update(acessorio: Acessorio, id: number): Observable<string> {
        return this.http.put<string>(this.API+"/update/"+ id, acessorio, {responseType: 'text' as 'json'});
      }

      findById(id: number): Observable<Acessorio[]> {
        return this.http.get<Acessorio[]>(this.API+"/findAll"+id);
      }

      findAll(): Observable<Acessorio[]> {
        return this.http.get<Acessorio[]>(this.API+"/findAll");
      }

      delete(id: number): Observable<string> {
        return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
      }
}
