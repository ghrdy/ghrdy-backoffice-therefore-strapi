import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuriteProtectionComponent } from './securite-protection.component';

describe('SecuriteProtectionComponent', () => {
  let component: SecuriteProtectionComponent;
  let fixture: ComponentFixture<SecuriteProtectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecuriteProtectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecuriteProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
