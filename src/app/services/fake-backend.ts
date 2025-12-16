import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface NamesResponse {
  nomiMaschili: string[];
  nomiFemminili: string[];
}


@Injectable({
  providedIn: 'root',
})
export class FakeBackend {

  private readonly http = inject(HttpClient);
  private readonly jsonUrlNamesMale = 'names-male.json';
  private readonly jsonUrlNamesFemale = 'names-female.json';
  private readonly jsonUrlSurnames = 'surnames.json';
  private readonly jsonUrlCities = 'cities.json';
  
  
  getSurnames(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrlSurnames);
  }
  
  
  getCities(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrlCities);
  }
  
  
  getName(): Observable<{ name: string; sex: 'M' | 'F' } | undefined> {
    const isMale = Math.random() % 2 === 0;

    const url = isMale
      ? this.jsonUrlNamesMale
      : this.jsonUrlNamesFemale;

    const sex = isMale ? 'M' : 'F';

    return this.http.get<string[]>(url).pipe(
      map(names => {
        if (!names || names.length === 0) {
          return undefined;
        }

        const randomIndex = Math.floor(Math.random() * names.length);

        return {
          name: names[randomIndex],
          sex
        };
      })
    );
  }

  
  getSurname(): Observable<any | undefined> {
    return this.getSurnames().pipe(
      map(surnames => {
        const randomIndex = Math.floor(Math.random() * surnames.length);
        return surnames[randomIndex];
      })
    );
  }

  
  getCity(): Observable<{description:string, provinceDescription: string, cap: string, istatCode:string} | undefined> {
    return this.getCities().pipe(
      map(cities => {
        const randomIndex = Math.floor(Math.random() * cities.length);
        return {
          description: cities[randomIndex].description, 
          provinceDescription: cities[randomIndex].provinceDescription,
          cap: cities[randomIndex].cap,
          istatCode: cities[randomIndex].istatCode
        };
      })
    );
  }

  
}
