import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostListEntryComponent } from './host-list-entry.component';

describe('HostListEntryComponent', () => {
  let component: HostListEntryComponent;
  let fixture: ComponentFixture<HostListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostListEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
