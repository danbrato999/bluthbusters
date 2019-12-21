import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BbTopbarComponent } from './bb-topbar.component';

describe('BbTopbarComponent', () => {
  let component: BbTopbarComponent;
  let fixture: ComponentFixture<BbTopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbTopbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
