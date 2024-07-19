import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlumenderladenComponent } from './blumenderladen/blumenderladen.component';
import { EventsComponent } from './events/events.component';
import { ProduktkatalogComponent } from './produktkatalog/produktkatalog.component';
import { QuizComponent } from './quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { LoginComponent } from './login/login.component';
import { AnmeldeformulareventComponent } from './anmeldeformularevent/anmeldeformularevent.component';
import { ErsatzfuerregComponent } from './ersatzfuerreg/ersatzfuerreg.component';
import { ProfilmitarbeiterComponent } from './profilmitarbeiter/profilmitarbeiter.component';

const routes: Routes = [
  { path: 'blumenderladen', component: BlumenderladenComponent },
  { path: 'events', component: EventsComponent },
  { path: 'produktkatalog', component: ProduktkatalogComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'profilmitarbeiter', component: ProfilmitarbeiterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'anmeldeformularevent', component: AnmeldeformulareventComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signup', component: ErsatzfuerregComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}


