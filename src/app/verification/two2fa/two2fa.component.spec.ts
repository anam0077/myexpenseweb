import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Two2faComponent } from './two2fa.component';

describe('Two2faComponent', () => {
  let component: Two2faComponent;
  let fixture: ComponentFixture<Two2faComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Two2faComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Two2faComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
