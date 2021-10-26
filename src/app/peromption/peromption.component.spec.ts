import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeromptionComponent } from './peromption.component';

describe('PeromptionComponent', () => {
  let component: PeromptionComponent;
  let fixture: ComponentFixture<PeromptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeromptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeromptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
