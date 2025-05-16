import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Template-Driven Forms',
    loadComponent: () =>
      import(
        './layouts/template-forms/template-forms-page/template-forms-page.component'
      ).then((m) => m.TemplateFormsPageComponent),
  },

  {
    path: 'reactive-forms',
    title: 'Reactive Forms',
    loadComponent: () =>
      import(
        './layouts/reactive-forms/reactive-forms-page/reactive-forms-page.component'
      ).then((m) => m.ReactiveFormsPageComponent),
  },
  {
    path: 'dynamic-forms',
    title: 'dynamic Forms',
    loadComponent: () =>
      import(
        './layouts/dynamic-forms/dynamic-forms/dynamic-forms.component'
      ).then((m) => m.DynamicFormsComponent),
  },
];
