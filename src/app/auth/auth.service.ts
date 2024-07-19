import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string | null = null;
  benutzername: string | null = null; 
  kundenID: number | null = null;
  mitarbeiterID: number | null = null;
  vorname: string | null = null;
  nachname: string | null = null;
  geburtsdatum: string | null = null;
  telefonnummer: number | null = null;
  email: string | null = null;
  passwort: string | null = null;
  strasse: string | null = null;
  hausnummer: number | null = null;
  stadt: string | null = null;
  plz: number | null = null;
  usertyp: string | null = null;


  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('/loginKunde', { email, password }).pipe(
      tap(response => {
        if (response.status === 'success') {
          this.isLoggedIn = true;
          this.vorname = response.data.Vorname;
          this.nachname = response.data.Nachname;
          this.setUserTyp(response.data.EMail);
          if(this.usertyp?.match("kunde")) {
            this.benutzername = response.data.Benutzername;
            this.kundenID = response.data.KundenID;
          }else if(this.usertyp?.match("mitarbeiter")) {
            console.log("Ist Mitarbeiter");
            this.benutzername = this.vorname + " " + this.nachname;            
            this.mitarbeiterID = response.data.MitarbeiterID;
          }else {
            console.log("ist nix");
          }
          this.geburtsdatum = this.formatDate(response.data.Geburtsdatum), // Formatieren des Geburtsdatums
          this.telefonnummer = response.data.Telefonnummer;
          this.email = response.data.EMail;
          this.passwort = response.data.Passwort;
          this.strasse = response.data.Straße;
          this.hausnummer = response.data.Hausnummer;
          this.stadt = response.data.Stadt;
          this.plz = response.data.PLZ;
          console.log('Login erfolgreich, Benutzername: ', this.benutzername);
          this.router.navigate(['/home']);
        } else {
          console.log('Login fehlgeschlagen, Antwort: ', response);
        }
      }),
      catchError(err => {
        console.log('Fehler beim Login: ', err);
        return throwError(err);
      })
    );
  }
  
  getKundenID(): number | null {
    return this.kundenID;
  }
  getMitarbeiterID(): number | null {
    return this.mitarbeiterID;
  }
  
  getBenutzername(): string | null {
    return this.benutzername;
  }
  
  getNachname(): string | null {
    return this.nachname;
  }

  getVorname(): string | null {
    return this.vorname
  }
  
  getGeburtsdatum(): string | null {
    return this.geburtsdatum;
  }
  
  getTelefonnummer(): number | null {
    return this.telefonnummer;
  }
  
  getEmail(): string | null {
    return this.email;
  }
  
  getPasswort(): string | null {
    return this.passwort;
  }
  
  getStrasse(): string | null {
    return this.strasse;
  }
  
  getHausnummer(): number | null {
    return this.hausnummer;
  }
  
  getStadt(): string | null {
    return this.stadt;
  }
  
  getPLZ(): number | null {
    return this.plz;
  }

  getUserTyp(): string | null {
    return this.usertyp;
  }
  

  formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.benutzername='';
    this.router.navigate(['/home']);

  }

  setUserTyp(email: string): void {
    const result = email.split('@');

    if(result[1] === 'blumenLadenRostin.de'){
      this.usertyp = 'mitarbeiter'
    }else{
      this.usertyp = 'kunde'
    }
  }
}
