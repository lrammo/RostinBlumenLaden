import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilmitarbeiterComponent } from './profilmitarbeiter.component';

describe('ProfilmitarbeiterComponent', () => {
  let component: ProfilmitarbeiterComponent;
  let fixture: ComponentFixture<ProfilmitarbeiterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilmitarbeiterComponent]
    });
    fixture = TestBed.createComponent(ProfilmitarbeiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
