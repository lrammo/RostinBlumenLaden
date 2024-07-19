import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErsatzfuerregComponent } from './ersatzfuerreg.component';

describe('ErsatzfuerregComponent', () => {
  let component: ErsatzfuerregComponent;
  let fixture: ComponentFixture<ErsatzfuerregComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErsatzfuerregComponent]
    });
    fixture = TestBed.createComponent(ErsatzfuerregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
