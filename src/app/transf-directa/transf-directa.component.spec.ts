import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfDirectaComponent } from './transf-directa.component';

describe('TransfDirectaComponent', () => {
  let component: TransfDirectaComponent;
  let fixture: ComponentFixture<TransfDirectaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfDirectaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfDirectaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
