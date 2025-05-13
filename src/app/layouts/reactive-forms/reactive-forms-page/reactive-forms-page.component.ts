import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { banWords } from '../validators/ban-words.validator';
import {
  bufferCount,
  filter,
  Observable,
  startWith,
  Subscription,
  tap,
} from 'rxjs';
import { UniqueUsernameValidator } from '../validators/unique-username.validator';
import { UserSkillsService } from '../../../core/services/user-skills.service';
import { passwordShouldMatch } from '../validators/password-should-match.validator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reactive-forms-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './reactive-forms-page.component.html',
  styleUrl: './reactive-forms-page.component.css',
})
export class ReactiveFormsPageComponent implements OnInit, OnDestroy {
  readonly phoneLabels = ['Main', 'Mobile', 'Work', 'Home'];
  readonly bannedNames = ['test', 'test-2'];
  readonly bannedUsernames = ['test', 'test-2', 'anonymous'];
  readonly usernamePattern = /^[\w.]+$/;

  readonly years = this.generateYears();
  skills$!: Observable<string[]>;
  form!: FormGroup;

  private initialFormValues: any;
  private subscriptions: Subscription[] = [];

  @ViewChild(FormGroupDirective) private formDir!: FormGroupDirective;

  skillsLoading = true;

  constructor(
    private userSkills: UserSkillsService,
    private fb: FormBuilder,
    private uniqueUsername: UniqueUsernameValidator,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initSkills();
    this.setupAgeValidation();
    this.trackFormPendingState();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: [
        'ma9net',
        [
          Validators.required,
          Validators.minLength(4),
          banWords(this.bannedNames),
        ],
      ],
      lastName: ['Hadi', [Validators.required, Validators.minLength(2)]],
      username: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern(this.usernamePattern),
            banWords(this.bannedUsernames),
          ],
          asyncValidators: [
            this.uniqueUsername.validate.bind(this.uniqueUsername),
          ],
          updateOn: 'blur',
        },
      ],
      email: ['Hadi@ma9net.com', [Validators.required, Validators.email]],
      yearOfBirth: this.fb.nonNullable.control(
        this.years[this.years.length - 1],
        Validators.required
      ),
      passport: ['', [Validators.pattern(/^[A-Z]{2}[0-9]{6}$/)]],
      address: this.fb.nonNullable.group({
        fullAddress: ['', Validators.required],
        city: ['', Validators.required],
        postCode: [0, Validators.required],
      }),
      phones: this.fb.array([this.createPhoneGroup()]),
      skills: this.fb.group({
        angular: [false],
        typescript: [false],
        rxjs: [false],
      }),
      password: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        },
        { validators: passwordShouldMatch }
      ),
    });
  }

  private initSkills(): void {
    this.skills$ = this.userSkills.getSkills().pipe(
      tap((skills) => this.addSkillControls(skills)),
      tap(() => (this.initialFormValues = this.form.value))
    );
  }

  private setupAgeValidation(): void {
    const sub = this.form
      .get('yearOfBirth')!
      .valueChanges.pipe(startWith(this.form.get('yearOfBirth')!.value))
      .subscribe((year: number) => {
        const passportControl = this.form.get('passport')!;
        if (this.isAdult(year)) {
          passportControl.addValidators(Validators.required);
        } else {
          passportControl.removeValidators(Validators.required);
        }
        passportControl.markAsDirty();
        passportControl.updateValueAndValidity();
      });
    this.subscriptions.push(sub);
  }

  private trackFormPendingState(): void {
    const sub = this.form.statusChanges
      .pipe(
        bufferCount(2, 1),
        filter(([prev]) => prev === 'PENDING')
      )
      .subscribe(() => this.cd.markForCheck());
    this.subscriptions.push(sub);
  }

  private createPhoneGroup(): FormGroup {
    return this.fb.group({
      label: this.fb.nonNullable.control(this.phoneLabels[0]),
      phone: '',
    });
  }

  private generateYears(): number[] {
    const current = new Date().getFullYear();
    return Array.from({ length: 40 }, (_, i) => current - i);
  }

  private isAdult(year: number): boolean {
    return new Date().getFullYear() - year >= 18;
  }

  private addSkillControls(skills: string[]): void {
    const skillsRecord = this.form.get('skills') as FormRecord<
      FormControl<boolean>
    >;
    skills.forEach((skill) => {
      skillsRecord.addControl(skill, this.fb.nonNullable.control(false));
    });
  }

  addPhone(): void {
    this.phones.insert(0, this.createPhoneGroup());
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.form.value);
    this.initialFormValues = this.form.value;
    this.formDir.resetForm(this.form.value);
  }

  onReset(event: Event): void {
    event.preventDefault();
    this.formDir.resetForm(this.initialFormValues);
  }

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  get passwordGroup(): FormGroup {
    return this.form.get('password') as FormGroup;
  }

  get confirmPasswordControl(): AbstractControl | null {
    return this.passwordGroup.get('confirmPassword');
  }

  get firstNameCtrl() {
    return this.form.get('firstName');
  }

  trackByIndex(index: number): number {
    return index;
  }

  hasError(controlPath: string, error: string) {
    const control = this.form.get(controlPath);
    return control?.hasError(error) && (control.dirty || control.touched);
  }

  getError(controlPath: string, error: string): any {
    return this.form.get(controlPath)?.getError(error);
  }
}
