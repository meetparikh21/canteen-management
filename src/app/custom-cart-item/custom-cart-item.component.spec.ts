import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCartItemComponent } from './custom-cart-item.component';

describe('CustomCartItemComponent', () => {
  let component: CustomCartItemComponent;
  let fixture: ComponentFixture<CustomCartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCartItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
