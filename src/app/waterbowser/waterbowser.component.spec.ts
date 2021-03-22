import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterbowserComponent } from './waterbowser.component';

describe('WaterbowserComponent', () => {
  let component: WaterbowserComponent;
  let fixture: ComponentFixture<WaterbowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterbowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterbowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
