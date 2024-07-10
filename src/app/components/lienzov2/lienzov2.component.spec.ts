import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lienzov2Component } from './lienzov2.component';

describe('Lienzov2Component', () => {
  let component: Lienzov2Component;
  let fixture: ComponentFixture<Lienzov2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lienzov2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lienzov2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
