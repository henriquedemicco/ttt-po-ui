import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlaygroundComponent } from './select-playground.component';

describe('SelectPlaygroundComponent', () => {
  let component: SelectPlaygroundComponent;
  let fixture: ComponentFixture<SelectPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
