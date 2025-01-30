import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresInterventionComponent } from './procedures-intervention.component';

describe('ProceduresInterventionComponent', () => {
  let component: ProceduresInterventionComponent;
  let fixture: ComponentFixture<ProceduresInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceduresInterventionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProceduresInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
