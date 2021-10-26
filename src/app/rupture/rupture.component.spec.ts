import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuptureComponent } from './rupture.component';

describe('RuptureComponent', () => {
  let component: RuptureComponent;
  let fixture: ComponentFixture<RuptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuptureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
