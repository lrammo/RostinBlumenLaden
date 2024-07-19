import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { AuthService } from '../auth/auth.service';
import { ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profilmitarbeiter',
  templateUrl: './profilmitarbeiter.component.html',
  styleUrls: ['./profilmitarbeiter.component.css']
})
export class ProfilmitarbeiterComponent {

  public events: any = {
    events: []
  };

  public eventTeilnehmer: any = {};
  
  @ViewChild('oldPasswordInput') oldPasswordInput!: ElementRef;
  @ViewChild('newPasswordInput') newPasswordInput!: ElementRef;
  @ViewChild('vorname') vorname!: ElementRef;
  @ViewChild('nachname') nachname!: ElementRef;
  @ViewChild('strasse') strasse!: ElementRef;
  @ViewChild('hausnummer') hausnummer!: ElementRef;
  @ViewChild('stadt') stadt!: ElementRef;
  @ViewChild('plz') plz!: ElementRef;
  @ViewChild('telefon') telefon!: ElementRef;

  user = {
    benutzername: this.authService.getBenutzername(),
    mitarbeiterID: this.authService.getKundenID(),
    vorname: this.authService.getVorname(),
    nachname: this.authService.getNachname(),
    geburtsdatum:this.authService.getGeburtsdatum(),
    telefonnummer: this.authService.getTelefonnummer(),
    email: this.authService.getEmail(),
    passwort: this.authService.getPasswort(),
    strasse: this.authService.getStrasse(),
    hausnummer: this.authService.getHausnummer(),
    stadt: this.authService.getStadt(),
    plz: this.authService.getPLZ()

  };

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.http.get<any[]>('/events/before').subscribe(
      (response: any[]) => {
        const fetchedEvents = response.map((item) => ({ 
          id: item.EventID,
          datum: this.formatDate(item.Datum),
          name: item.Name,
          thema: item.Thema,
          beschreibung: item.Beschreibung
        }));
        this.events.events = fetchedEvents;
        this.events.events.forEach((event: any) => {
          this.getTeilnehmer(event.id);
        });
        },
    (error) => {
      console.error('Fehler beim Abrufen der bevorstehenden Events:', error);
    }
  );
  }

  getTeilnehmer(eventID: number): void {
    this.http.get<any[]>(`/events/${eventID}/teilnehmer`).subscribe(
      (response) => {
        const fetchedTeilnehmer = response.map((item) => ({
          id: item.KundenID,
          nachname: item.Nachname,
          vorname: item.Vorname,
          email: item.Email
        }));
        
        this.eventTeilnehmer[eventID] = fetchedTeilnehmer;
      },
      (error) => {
        console.error('Fehler beim Abrufen der Teilnehmer:', error);
      }
    );
  }
  

  getTeilnehmerForEvent(eventID: number): any[] {
    return this.eventTeilnehmer[eventID] || [];
  }

  formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  constructor(private http: HttpClient,private authService: AuthService,private snackBar: MatSnackBar) {
  }

  submitForm(): void{
    const url = `/mitarbeiter/${this.user.mitarbeiterID}`; 
    const mitarbeiter = {
      Nachname: this.nachname.nativeElement.value,
      Vorname: this.vorname.nativeElement.value,
      Telefonnummer: this.telefon.nativeElement.value,
      Straße: this.strasse.nativeElement.value,
      Hausnummer: this.hausnummer.nativeElement.value,
      Stadt: this.stadt.nativeElement.value,
      PLZ: this.plz.nativeElement.value,
    };

    this.http.put(url, mitarbeiter).subscribe(
      (response) => {
        console.log('Mitarbeiter erfolgreich aktualisiert.');
        this.snackBar.open('Änderungen erfolgreich übernommen.', 'OK', { duration: 3000 });
      },
      (error) => {
        console.error('Fehler beim Aktualisieren:', error);
      }
    );
  }

  submitFormPasswort(): void {
  
    if (this.oldPasswordInput.nativeElement.value !== this.authService.getPasswort()) {
      this.snackBar.open('Das eingegebene alte Passwort stimmt nicht überein', 'OK', { duration: 3000 });
      console.log('Das eingegebene alte Passwort ist nicht korrekt.');
    }else{
      const url = `/mitarbeiter/${this.user.mitarbeiterID}/passwort`; 
      const body = { Passwort: this.newPasswordInput.nativeElement.value };

      this.http.put(url, body).subscribe(
      (response) => {
        console.log('Passwort erfolgreich aktualisiert.');
        this.snackBar.open('Passwort erfolgreich aktualisiert.', 'OK', { duration: 3000 });
        this.oldPasswordInput.nativeElement.set("");
        this.newPasswordInput.nativeElement.set("");
      },
      (error) => {
        console.error('Fehler beim Aktualisieren des Passworts:', error);
      }
    );
  
    }
  
  }

}
