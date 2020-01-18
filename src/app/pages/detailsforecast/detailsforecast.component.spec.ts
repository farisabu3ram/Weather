import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsforecastComponent } from './detailsforecast.component';

describe('DetailsforecastComponent', () => {
  let component: DetailsforecastComponent;
  let fixture: ComponentFixture<DetailsforecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsforecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
