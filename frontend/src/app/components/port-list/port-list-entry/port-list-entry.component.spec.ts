import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortListEntryComponent } from './port-list-entry.component';

describe('PortListEntryComponent', () => {
  let component: PortListEntryComponent;
  let fixture: ComponentFixture<PortListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortListEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
