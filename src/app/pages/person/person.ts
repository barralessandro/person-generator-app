import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FakeBackend } from '../../services/fake-backend';
import { forkJoin, map } from 'rxjs';
import { generateFiscalCode, generateRandomDate, PersonData } from '../../services/fiscal-code.service';
import { AsyncPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CardModule, DatePipe, AsyncPipe],
  templateUrl: './person.html',
  styleUrl: './person.scss',
})
export class Person {

  private readonly fakeBackend = inject(FakeBackend);
  person$ = forkJoin({
    name: this.fakeBackend.getName(),
    surname: this.fakeBackend.getSurname(),
    city: this.fakeBackend.getCity()
  }).pipe(
    map(({ name, surname, city }) => {
      if (!name || !surname || !city) {
        throw new Error('Dati incompleti');
      }

      const person: PersonData = {
        name: name.name,
        surname,
        sex: name.sex,
        birthDate: generateRandomDate(
          new Date(1940, 0, 1),
          new Date(2026, 0, 31)
        ),
        birthPlaceIstatCode: city.istatCode,
        birthPlaceProvince: city.provinceDescription,
        birthPlace: city.description,
        taxCode: ''
      };

      return {
        ...person,
        taxCode: generateFiscalCode(person)
      };
    })
  );

}
