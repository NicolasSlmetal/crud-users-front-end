import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCardContainer } from './address-card-container';

describe('AddressCardContainer', () => {
  let component: AddressCardContainer;
  let fixture: ComponentFixture<AddressCardContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressCardContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressCardContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
