import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SccomComponent } from './sccom.component';

describe('SccomComponent', () => {
  let component: SccomComponent;
  let fixture: ComponentFixture<SccomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SccomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SccomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
