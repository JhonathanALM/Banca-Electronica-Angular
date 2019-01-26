import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosConsolidadaComponent } from './pos-consolidada.component';

describe('PosConsolidadaComponent', () => {
  let component: PosConsolidadaComponent;
  let fixture: ComponentFixture<PosConsolidadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosConsolidadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosConsolidadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
