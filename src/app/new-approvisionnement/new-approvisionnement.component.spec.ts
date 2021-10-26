import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApprovisionnementComponent } from './new-approvisionnement.component';

describe('NewApprovisionnementComponent', () => {
  let component: NewApprovisionnementComponent;
  let fixture: ComponentFixture<NewApprovisionnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewApprovisionnementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApprovisionnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
