import { Routes } from '@angular/router';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { Person } from './pages/person/person';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'person',
        pathMatch: 'full'
    },
    {
        path: 'person',
        component: Person
    },
    {
        path: 'page-not-found',
        component: PageNotFound
    },
    {
        path: '**',
        redirectTo: 'page-not-found'
    }
];
