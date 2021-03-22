import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngullyComponent } from './ongully.component';

describe('OngullyComponent', () => {
  let component: OngullyComponent;
  let fixture: ComponentFixture<OngullyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngullyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
