import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaComplainComponent } from './la-complain.component';

describe('LaComplainComponent', () => {
  let component: LaComplainComponent;
  let fixture: ComponentFixture<LaComplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaComplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
