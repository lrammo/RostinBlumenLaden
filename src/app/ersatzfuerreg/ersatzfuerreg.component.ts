import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ersatzfuerreg',
  templateUrl: './ersatzfuerreg.component.html',
  styleUrls: ['./ersatzfuerreg.component.css'],
})
export class ErsatzfuerregComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  pattern = {
    name: /^[A-Za-z]+$/,
    telefonnummer: /^\d{1,8}$/,
    passwort: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    nummer: /^[0-9]+$/,
    stadt: /^[\w\s-]+$/,
  };

  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      const age = Math.floor(
        (Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
      );

      return age >= minAge ? null : { minAge: { value: control.value } };
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Benutzername: [
        '',
        [Validators.required, Validators.pattern(this.pattern.name)],
      ],
      Nachname: [
        '',
        [Validators.required, Validators.pattern(this.pattern.name)],
      ],
      Vorname: [
        '',
        [Validators.required, Validators.pattern(this.pattern.name)],
      ],
      Geburtsdatum: ['', [Validators.required, this.minAgeValidator(18)]],
      Telefonnummer: [
        '',
        [Validators.required, Validators.pattern(this.pattern.telefonnummer)],
      ],
      EMail: ['', [Validators.required, Validators.email]],
      Passwort: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.pattern.passwort),
        ],
      ],
      Straße: [
        '',
        [Validators.required, Validators.pattern(this.pattern.name)],
      ],
      Hausnummer: [
        '',
        [Validators.required, Validators.pattern(this.pattern.nummer)],
      ],
      Stadt: [
        '',
        [Validators.required, Validators.pattern(this.pattern.stadt)],
      ],
      PLZ: ['', [Validators.required, Validators.pattern(this.pattern.nummer)]],
    });
    this.checkBenutzernameAvailability();
    this.setupLiveValidation();
    this.checkEMailAvailability();
  }
  checkBenutzernameAvailability() {
    const benutzernameControl = this.registerForm.get('Benutzername');

    if (benutzernameControl) {
      benutzernameControl.valueChanges.subscribe((benutzername: string) => {
        if (benutzername) {
          this.http
            .post('/benutzername', { Benutzername: benutzername })
            .subscribe(
              (response: any) => {
                if (!response.available) {
                  benutzernameControl.setErrors({ benutzernameExists: true });
                } else {
                  benutzernameControl.setErrors(null);
                }
              },
              (error) => {
                console.error(
                  'Fehler bei der Überprüfung des Benutzernamens:',
                  error
                );
              }
            );
        }
      });
    }
  }

  checkEMailAvailability() {
    const EMailControl = this.registerForm.get('EMail');

    if (EMailControl) {
      EMailControl.valueChanges.subscribe((email: string) => {
        if (email) {
          this.http.post('/email', { EMail: email }).subscribe(
            (response: any) => {
              if (!response.available) {
                EMailControl.setErrors({ emailExists: true });
              } else {
                EMailControl.setErrors(null);
              }
            },
            (error) => {
              console.error('Fehler bei der Überprüfung der E-Mail:', error);
            }
          );
        }
      });
    }
  }

  setupLiveValidation() {
    const formControls = this.registerForm.controls;

    Object.keys(formControls).forEach((controlName) => {
      const control = formControls[controlName];

      if (control) {
        control.valueChanges.subscribe(() => {
          if (control.invalid && (control.dirty || control.touched)) {
            control.markAsTouched();
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const data = {
        Benutzername: this.registerForm.value.Benutzername,
        Nachname: this.registerForm.value.Nachname,
        Vorname: this.registerForm.value.Vorname,
        Geburtsdatum: this.registerForm.value.Geburtsdatum,
        Telefonnummer: this.registerForm.value.Telefonnummer,
        EMail: this.registerForm.value.EMail,
        Passwort: this.registerForm.value.Passwort,
        Straße: this.registerForm.value.Straße,
        Hausnummer: this.registerForm.value.Hausnummer,
        Stadt: this.registerForm.value.Stadt,
        PLZ: this.registerForm.value.PLZ,
      };

      this.http.post('/kunde', data).subscribe(
        (response) => {
          console.log('Registrierung erfolgreich! Antwort: ', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Es gab ein Problem bei der Registrierung: ', error);
        }
      );
    }
  }
}
