import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccompagmentComponent } from './accompagment.component';

describe('AccompagmentComponent', () => {
  let component: AccompagmentComponent;
  let fixture: ComponentFixture<AccompagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccompagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccompagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
