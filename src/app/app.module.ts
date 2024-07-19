import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { BlumenderladenComponent } from './blumenderladen/blumenderladen.component';
import { EventsComponent } from './events/events.component';
import { ProduktkatalogComponent } from './produktkatalog/produktkatalog.component';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShopService } from './shop.service';
import { ProfilComponent } from './profil/profil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AnmeldeformulareventComponent } from './anmeldeformularevent/anmeldeformularevent.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './auth/auth.service';
import { ErsatzfuerregComponent } from './ersatzfuerreg/ersatzfuerreg.component';
import { ProfilmitarbeiterComponent } from './profilmitarbeiter/profilmitarbeiter.component';

@NgModule({
  declarations: [
    AppComponent,
    BlumenderladenComponent,
    EventsComponent,
    ProduktkatalogComponent,
    QuizComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProfilComponent,
    LoginComponent,
    AnmeldeformulareventComponent,
    ErsatzfuerregComponent,
    ProfilmitarbeiterComponent,
  ],

  
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [RouterModule],
  providers: [ShopService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
