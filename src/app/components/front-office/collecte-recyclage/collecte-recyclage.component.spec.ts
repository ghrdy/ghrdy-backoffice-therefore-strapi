import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollecteRecyclageComponent } from './collecte-recyclage.component';

describe('CollecteRecyclageComponent', () => {
  let component: CollecteRecyclageComponent;
  let fixture: ComponentFixture<CollecteRecyclageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollecteRecyclageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollecteRecyclageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
