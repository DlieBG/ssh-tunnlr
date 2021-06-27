import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Host } from 'src/app/interfaces/host';

@Component({
  selector: 'app-host-list-entry',
  templateUrl: './host-list-entry.component.html',
  styleUrls: ['./host-list-entry.component.scss']
})
export class HostListEntryComponent implements OnInit {

  @Input() host!: Host;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  edit() {
    this.router.navigate(['host', this.host._id]);
  }

}
