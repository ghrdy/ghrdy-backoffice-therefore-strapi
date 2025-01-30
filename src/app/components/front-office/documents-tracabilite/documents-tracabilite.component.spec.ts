import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsTracabiliteComponent } from './documents-tracabilite.component';

describe('DocumentsTracabiliteComponent', () => {
  let component: DocumentsTracabiliteComponent;
  let fixture: ComponentFixture<DocumentsTracabiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsTracabiliteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentsTracabiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
