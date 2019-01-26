import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfActivacionComponent } from './transf-activacion.component';

describe('TransfActivacionComponent', () => {
  let component: TransfActivacionComponent;
  let fixture: ComponentFixture<TransfActivacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfActivacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfActivacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
