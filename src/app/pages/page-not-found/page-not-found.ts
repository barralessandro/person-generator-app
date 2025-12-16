import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="404">
      <p>Pagina non trovata</p>
    </p-card>
  `
})
export class PageNotFound {

}
