import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanciaComponent } from './distancia.component';

describe('DistanciaComponent', () => {
  let component: DistanciaComponent;
  let fixture: ComponentFixture<DistanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistanciaComponent]
    });
    fixture = TestBed.createComponent(DistanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
