import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlcomplainComponent } from './slcomplain.component';

describe('SlcomplainComponent', () => {
  let component: SlcomplainComponent;
  let fixture: ComponentFixture<SlcomplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlcomplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlcomplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
