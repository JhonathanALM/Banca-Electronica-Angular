import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoSimuladorComponent } from './prestamo-simu.component';

describe('PrestamoSimuladorComponent', () => {
  let component: PrestamoSimuladorComponent;
  let fixture: ComponentFixture<PrestamoSimuladorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestamoSimuladorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamoSimuladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
