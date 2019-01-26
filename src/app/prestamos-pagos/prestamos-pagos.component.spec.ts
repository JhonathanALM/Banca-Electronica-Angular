import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosPagosComponent } from './prestamos-pagos.component';

describe('PrestamosPagosComponent', () => {
  let component: PrestamosPagosComponent;
  let fixture: ComponentFixture<PrestamosPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestamosPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamosPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
