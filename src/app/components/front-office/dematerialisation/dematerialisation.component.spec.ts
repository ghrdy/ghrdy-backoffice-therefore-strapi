import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DematerialisationComponent } from './dematerialisation.component';

describe('DematerialisationComponent', () => {
  let component: DematerialisationComponent;
  let fixture: ComponentFixture<DematerialisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DematerialisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DematerialisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
