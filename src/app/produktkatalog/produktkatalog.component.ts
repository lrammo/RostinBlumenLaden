import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-produktkatalog',
  templateUrl: './produktkatalog.component.html',
  styleUrls: ['./produktkatalog.component.css']
})
export class ProduktkatalogComponent implements OnInit {
  public produktkatalog: any = {
    waren: []
  };
  warenkorb: any[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProduktkatalog();
  }

  getProduktkatalog() {
    console.log('getProduktkatalog() wird aufgerufen');

    this.http.get<any[]>('/blumen').subscribe(
      (response: any[]) => {
        const fetchedWaren = response.map((item) => ({
          blumeID: item.BlumeID,
          blumename: item.Name,
          type: item.Blumeart,
          art: item.Art,
          description: item.Beschreibung,
          image: '../assets/images/' + item.Name + '.jpg',
        }));
        this.produktkatalog.waren = fetchedWaren;
        console.log('Produktkatalogdaten: ', this.produktkatalog);
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Waren:', error);
      }
    );
  }
}