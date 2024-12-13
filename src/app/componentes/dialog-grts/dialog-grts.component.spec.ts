import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGrtsComponent } from './dialog-grts.component';

describe('DialogGrtsComponent', () => {
  let component: DialogGrtsComponent;
  let fixture: ComponentFixture<DialogGrtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogGrtsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogGrtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
