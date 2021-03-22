import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnpayComponent } from './onpay.component';

describe('OnpayComponent', () => {
  let component: OnpayComponent;
  let fixture: ComponentFixture<OnpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
