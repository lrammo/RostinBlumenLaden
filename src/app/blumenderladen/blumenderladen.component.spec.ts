import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlumenderladenComponent } from './blumenderladen.component';

describe('BlumenderladenComponent', () => {
  let component: BlumenderladenComponent;
  let fixture: ComponentFixture<BlumenderladenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlumenderladenComponent]
    });
    fixture = TestBed.createComponent(BlumenderladenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
