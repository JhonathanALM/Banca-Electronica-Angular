import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfOtrosComponent } from './transf-otros.component';

describe('TransfOtrosComponent', () => {
  let component: TransfOtrosComponent;
  let fixture: ComponentFixture<TransfOtrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfOtrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfOtrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
