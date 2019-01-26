import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosSoliComponent } from './prestamos-soli.component';

describe('PrestamosSoliComponent', () => {
  let component: PrestamosSoliComponent;
  let fixture: ComponentFixture<PrestamosSoliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestamosSoliComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamosSoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
