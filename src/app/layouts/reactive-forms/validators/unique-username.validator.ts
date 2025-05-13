import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniqueUsernameValidator implements AsyncValidator {

  MOCK_USERNAMES = ['Hadi_deh', 'ma9net'];

  constructor() { }

  validate(control: AbstractControl<string>): Observable<ValidationErrors | null> {
      const input = control.value?.toLowerCase().trim();
  
      return of(this.MOCK_USERNAMES).pipe(
        delay(1000),
        map(usernames => {
          return usernames.includes(input)
            ? { appUniqueUsername: { isTaken: true } }
            : null;
        })
      );
    }

}
