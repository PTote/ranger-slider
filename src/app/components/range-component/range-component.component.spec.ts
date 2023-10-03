import { ComponentFixture, TestBed } from '@angular/core/testing';

import RangeComponentComponent from './range-component.component';

describe('RangeComponentComponent', () => {
  let component: RangeComponentComponent;
  let fixture: ComponentFixture<RangeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
