import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  
  public veranstaltungen: any = {
    events: []
  };


  constructor(private http: HttpClient, private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.getEvents(); 
  }

  getEvents() {
    console.log('getEvents() wird aufgerufen');

    this.http.get<any[]>('/event').subscribe(
      (response: any[]) => { 
        const fetchedEvents = response.map((item) => ({
          eventID: item.EventID,
          title: item.Name,
          theme: item.Thema,
          date: this.formatDate(item.Datum),
          description: item.Beschreibung
        }));
        this.veranstaltungen.events = fetchedEvents;  
         console.log('Events: ', this.veranstaltungen);
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Event-Daten:', error);
      }
    );
  }

  goToRegistration(eventId: number, eventname: string, eventdatum: string) {
    this.router.navigate(['/anmeldeformularevent'], { queryParams: { eventid: eventId, eventname: eventname, eventdatum: eventdatum } });
  }

  formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  isLoggedIn(): boolean {
    // Rufe den Login ab
    return this.authService.isLoggedIn;
  }
}


