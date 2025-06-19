import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchPlaygroundComponent } from './switch-playground.component';

describe('SwitchPlaygroundComponent', () => {
  let component: SwitchPlaygroundComponent;
  let fixture: ComponentFixture<SwitchPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchPlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
