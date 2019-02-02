import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoComponent } from './movimientos.component';


describe('MovimientosComponent', () => {
  let component: MovimientoComponent;
  let fixture: ComponentFixture<MovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
