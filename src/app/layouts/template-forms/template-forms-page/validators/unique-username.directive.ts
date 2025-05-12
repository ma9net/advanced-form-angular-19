import { Directive, ChangeDetectorRef } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

const MOCK_USERNAMES = ['Hadi_deh', 'ma9net'];

@Directive({
  selector: '[appUniqueUsername]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueUsernameDirective,
      multi: true,
    },
  ]
})
export class UniqueUsernameDirective implements AsyncValidator {
  constructor(private cd: ChangeDetectorRef) {}

  validate(control: AbstractControl<string>): Observable<ValidationErrors | null> {
    const input = control.value?.toLowerCase().trim();

    return of(MOCK_USERNAMES).pipe(
      delay(1000),
      map(usernames => {
        return usernames.includes(input)
          ? { appUniqueUsername: { isTaken: true } }
          : null;
      })
    );
  }
}
