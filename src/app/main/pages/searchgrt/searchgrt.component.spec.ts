import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchgrtComponent } from './searchgrt.component';

describe('SearchgrtComponent', () => {
  let component: SearchgrtComponent;
  let fixture: ComponentFixture<SearchgrtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchgrtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchgrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
