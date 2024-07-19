import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnmeldeformulareventComponent } from './anmeldeformularevent.component';

describe('AnmeldeformulareventComponent', () => {
  let component: AnmeldeformulareventComponent;
  let fixture: ComponentFixture<AnmeldeformulareventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnmeldeformulareventComponent]
    });
    fixture = TestBed.createComponent(AnmeldeformulareventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
