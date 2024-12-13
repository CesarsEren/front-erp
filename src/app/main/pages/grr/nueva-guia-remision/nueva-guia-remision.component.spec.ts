import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaGuiaRemisionComponent } from './nueva-guia-remision.component';

describe('NuevaGuiaRemisionComponent', () => {
  let component: NuevaGuiaRemisionComponent;
  let fixture: ComponentFixture<NuevaGuiaRemisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaGuiaRemisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaGuiaRemisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
