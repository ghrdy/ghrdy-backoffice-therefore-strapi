import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecylageValorisationComponent } from './recylage-valorisation.component';

describe('RecylageValorisationComponent', () => {
  let component: RecylageValorisationComponent;
  let fixture: ComponentFixture<RecylageValorisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecylageValorisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecylageValorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
