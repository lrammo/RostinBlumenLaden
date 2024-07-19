import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'BlumenLadenRostin',
  templateUrl: './blumenderladen.component.html',
  styleUrls: ['./blumenderladen.component.css']
})

export class BlumenderladenComponent {

  public blumenderladen: any = {
    blumen: []
  };
  
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getBlumenderladen(); 
  }

  getBlumenderladen() {
    console.log('getBlumenderladen() wird aufgerufen');
  
    this.http.get<any[]>('/blumen').subscribe(
      (response: any[]) => {
        const fetchedBlumenderladen = response.map((item) => ({
          blumeID: item.blumeID,
          name: item.name,
          art: item.art,
          description: item.description,
          preis: item.preis,
          image: '../assets/images/' + item.name + '.jpg', // Stelle sicher, die Bilder im assets/images-Ordner sind
        }));
        this.blumenderladen = fetchedBlumenderladen;
        console.log('BlumenderLaden: ', this.blumenderladen);
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Blumendaten:', error);
      }
    );
  }
  
    openFormular(blumename: string, art: string, blumeID: number) {
      this.router.navigate(['/kennenlernformular'], { 
        queryParams: { blumename: blumename, art: art, blumeID: blumeID } 
      });

  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}


