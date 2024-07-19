import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Ist für Anfragen wie GET / PUT / POST zuständig
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  myTest:any;
  
  public veranstaltungen: any = {
    events: []
  };

  public blumen: any = {
    blumen: []
  };

  constructor(private http: HttpClient,private router: Router) {
  };

  
  ngOnInit(): void {
    this.getEvents();
    this.getLatestBlumenderladen(); // Aufruf der Methode bei Initialisierung der Komponente
  }

  getEvents() {
    console.log('getEvents() wird aufgerufen');

    this.http.get<any[]>('/nextevent').subscribe(
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


  formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  goToRegistration(eventId: number) {
    this.router.navigate(['/registration'], { queryParams: { eventId: eventId } });
  }


  getLatestBlumenderladen() {
    console.log('getLatestBlumenderladen() wird aufgerufen');
  
    this.http.get<any[]>('/blumen').subscribe(
      (response: any[]) => {
        const fetchedBlumenderladen = response.map((item) => ({
          blumeID: item.blumeID,
          name: item.name,
          art: item.art,
          description: item.description,
          preis: item.preis,
          image: '../assets/images/' + item.name + '.jpg', // Stelle sicher, dass die Bilder im assets/images-Ordner vorhanden sind
        }));
        this.blumen = fetchedBlumenderladen;
        console.log('Blumendaten: ', this.blumen);
  
       // fetchedBlumenderladen.forEach((blume) => {
         // console.log('Bilderpfad:', blume.image);
        //});
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Blumendaten:', error);
      }
    );
  }
  
  openFormular(name: string, art: string, blumeID: number) {
    this.router.navigate(['/kennenlernformular'], { 
      queryParams: { name: name, art: art, blumeID: blumeID } 
    });
  
}

}

