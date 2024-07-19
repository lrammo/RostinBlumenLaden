import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { AuthService } from '../auth/auth.service';
import { ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})


export class ProfilComponent {

  @ViewChild('oldPasswordInput') oldPasswordInput!: ElementRef;
  @ViewChild('newPasswordInput') newPasswordInput!: ElementRef;
  @ViewChild('vorname') vorname!: ElementRef;
  @ViewChild('nachname') nachname!: ElementRef;
  @ViewChild('strasse') strasse!: ElementRef;
  @ViewChild('hausnummer') hausnummer!: ElementRef;
  @ViewChild('stadt') stadt!: ElementRef;
  @ViewChild('plz') plz!: ElementRef;
  @ViewChild('telefon') telefon!: ElementRef;


  public bestellungen: any = {
    bestellungen: []
  };

  public kundenevents: any = {
    events: []
  };

  user = {
    benutzername: this.authService.getBenutzername(),
    kundenID: this.authService.getKundenID(),
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
    this.getBestellungen();
    this.getKundenEvents();
  }

  getKundenEvents() {
    this.http.get<any[]>(`/kunde/${this.user.kundenID}/events`).subscribe(
      (response: any[]) => {
      const fetchedEvents = response.map((item) => ({ 
        id: item.EventID,
        datum: this.formatDate(item.Datum),
        name: item.Name,
        thema: item.Thema,
        beschreibung: item.Beschreibung
      }));
      this.kundenevents.events = fetchedEvents;
      },
      (error) => {
        console.error('Fehler beim Abrufen der Events:', error);
      }
    );
  }

  getBestellungen() {
    console.log('getBestellungen() wird aufgerufen');
    this.http.get<any[]>(`/bestellung/${this.user.kundenID}`).subscribe(
      (response: any[]) => {
        const fetchedBestellungen = response.map((item) => ({
          bestellnummer: item.Bestellnummer,
          datum: this.formatDate(item.Datum),
          bestellartID: item.BestellartID,
          mitarbeiterID: item.MitarbeiterID,
          kundenID: item.KundenID
        }));
        this.bestellungen.bestellungen = fetchedBestellungen;
        console.log('Bestellungen:', this.bestellungen);
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Bestellungen:', error);
      }
    );
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
    const url = `/kunde/${this.user.kundenID}`; 
    const kunde = {
      Nachname: this.nachname.nativeElement.value,
      Vorname: this.vorname.nativeElement.value,
      Telefonnummer: this.telefon.nativeElement.value,
      Straße: this.strasse.nativeElement.value,
      Hausnummer: this.hausnummer.nativeElement.value,
      Stadt: this.stadt.nativeElement.value,
      PLZ: this.plz.nativeElement.value,
    };

    this.http.put(url, kunde).subscribe(
      (response) => {
        console.log('Kunde erfolgreich aktualisiert.');
        this.snackBar.open('Änderungen erfolgreich übernommen.', 'OK', { duration: 3000 });
      },
      (error) => {
        console.error('Fehler beim Aktualisieren des Kunden:', error);
      }
    );
   
  }




  submitFormPasswort(): void {
    
    if (this.oldPasswordInput.nativeElement.value !== this.authService.getPasswort()) {
      this.snackBar.open('Das eingegebene alte Passwort stimmt nicht überein', 'OK', { duration: 3000 });
      console.log('Das eingegebene alte Passwort ist nicht korrekt.');
    }else{
      const url = `/kunde/${this.user.kundenID}/passwort`; 
      const body = { Passwort: this.newPasswordInput.nativeElement.value };

      this.http.put(url, body).subscribe({
        next: (): void => {
          console.log('Passwort erfolgreich aktualisiert.');
          this.oldPasswordInput.nativeElement.value = "";
          this.newPasswordInput.nativeElement.value = "";
          this.snackBar.open('Passwort erfolgreich aktualisiert.', 'OK', { duration: 3000 });
        },
        error: (error) => {
          console.error('Fehler beim Aktualisieren des Passworts:', error);
        }
      });
      
    
    }
  
  }


}
