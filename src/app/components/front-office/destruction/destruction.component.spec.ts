import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestructionComponent } from './destruction.component';

describe('DestructionComponent', () => {
  let component: DestructionComponent;
  let fixture: ComponentFixture<DestructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestructionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DestructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
