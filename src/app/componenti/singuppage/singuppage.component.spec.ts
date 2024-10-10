import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinguppageComponent } from './singuppage.component';

describe('SinguppageComponent', () => {
  let component: SinguppageComponent;
  let fixture: ComponentFixture<SinguppageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinguppageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinguppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
