import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleResultsComponent } from './raffle-results.component';

describe('RaffleResultsComponent', () => {
  let component: RaffleResultsComponent;
  let fixture: ComponentFixture<RaffleResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaffleResultsComponent]
    });
    fixture = TestBed.createComponent(RaffleResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
