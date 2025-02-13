import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { PeopleInterface } from '../interfaces';

const url = 'https://swapi.dev/api/people/';

@Injectable({ providedIn: 'root' })
export class UserService {
  #http = inject(HttpClient);

  // getUsers(): Promise<any[]> {
  //   return lastValueFrom(fetch<any[]>(url));
  // }

  getUsers(): Promise<PeopleInterface> {
    return lastValueFrom(this.#http.get<PeopleInterface>(url));
  }

  createUser = (body: PeopleInterface) => this.#http.post<PeopleInterface>(url, body);
}
