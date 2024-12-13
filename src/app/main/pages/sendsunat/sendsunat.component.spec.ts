import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendsunatComponent } from './sendsunat.component';

describe('SendsunatComponent', () => {
  let component: SendsunatComponent;
  let fixture: ComponentFixture<SendsunatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendsunatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendsunatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
