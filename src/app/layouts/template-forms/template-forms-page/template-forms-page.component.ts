import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BanWordsDirective } from './validators/ban-words.directive';
import { PasswordShouldMatchDirective } from './validators/password-should-match.directive';
import { UniqueUsernameDirective } from './validators/unique-username.directive';
import { UserInfo } from '../user-info.model';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-template-forms-page',
  imports: [
    CommonModule,
    FormsModule,
    BanWordsDirective,
    PasswordShouldMatchDirective,
    UniqueUsernameDirective,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './template-forms-page.component.html',
  styleUrl: './template-forms-page.component.css',
})
export class TemplateFormsPageComponent implements OnInit, AfterViewInit {
  userInfo: UserInfo = {
    firstName: 'Hadi',
    lastName: 'ma9net',
    username: 'hadi_deh.ma9net',
    email: 'hadi@deh.com',
    yearOfBirth: 1991,
    nationalCode: 'AB123456',
    fullAdress: 'Street Tab',
    city: 'TabTeh',
    postCode: 123456,
    password: '',
    confirmPassword: '',
  };

  @ViewChild(NgForm)
  formDir!: NgForm;

  private initialFormValues: unknown;

  get isAdult() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.userInfo.yearOfBirth >= 18;
  }

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.initialFormValues = this.formDir.value;
    });
  }

  onSubmitForm(e: SubmitEvent) {
    console.log('The form has been submitted', this.formDir.value);

    // form.resetForm();

    this.formDir.resetForm(this.formDir.value);
    this.initialFormValues = this.formDir.value;
  }

  onReset(e: Event) {
    e.preventDefault();
    this.formDir.resetForm(this.initialFormValues);
  }
}
