import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfHistorialComponent } from './transf-historial.component';

describe('TransfHistorialComponent', () => {
  let component: TransfHistorialComponent;
  let fixture: ComponentFixture<TransfHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
