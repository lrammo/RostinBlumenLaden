import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktkatalogComponent } from './produktkatalog.component';

describe('ProduktkatalogComponent', () => {
  let component: ProduktkatalogComponent;
  let fixture: ComponentFixture<ProduktkatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduktkatalogComponent]
    });
    fixture = TestBed.createComponent(ProduktkatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
