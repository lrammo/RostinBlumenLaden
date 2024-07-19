import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-anmeldeformularevent',
  templateUrl: './anmeldeformularevent.component.html',
  styleUrls: ['./anmeldeformularevent.component.css'],
})
export class AnmeldeformulareventComponent {
  user = {
    kundenID: this.authService.getKundenID(),
    vorname: this.authService.getVorname(),
    nachname: this.authService.getNachname(),
    telefonnummer: this.authService.getTelefonnummer(),
    email: this.authService.getEmail(),
  };

  public eventid!: number;
  public eventname!: string;
  public eventdatum!: string;

  ngOnInit(): void {
    console.log('ngOnInit aufgerufen');
    this.route.queryParams.subscribe((params) => {
      this.eventid = params['eventid'];
      this.eventname = params['eventname'];
      this.eventdatum = params['eventdatum'];
    });
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  submitForm(): void {
    const requestData = {
      KundenID: this.user.kundenID,
      EventID: this.eventid,
    };
    this.http.post('/eventteilnehmerliste', requestData).subscribe(
      (response) => {
        this.snackBar.open('Anmeldung erfolgreich!', 'OK', { duration: 3000 });
        this.router.navigate(['/events']);
        console.log('Erfolgreich eingefügt:', response);
      },
      (error) => {
        console.error('Fehler beim Einfügen:', error);
      }
    );
  }
}
