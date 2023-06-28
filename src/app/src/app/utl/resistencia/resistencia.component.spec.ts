import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResistenciaComponent } from './resistencia.component';

describe('ResistenciaComponent', () => {
  let component: ResistenciaComponent;
  let fixture: ComponentFixture<ResistenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResistenciaComponent]
    });
    fixture = TestBed.createComponent(ResistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
