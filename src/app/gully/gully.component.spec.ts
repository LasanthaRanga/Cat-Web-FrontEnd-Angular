import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GullyComponent } from './gully.component';

describe('GullyComponent', () => {
  let component: GullyComponent;
  let fixture: ComponentFixture<GullyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GullyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
