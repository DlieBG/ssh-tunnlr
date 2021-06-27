import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Host } from 'src/app/interfaces/host';
import { Port } from 'src/app/interfaces/port';

@Component({
  selector: 'app-port-list-entry',
  templateUrl: './port-list-entry.component.html',
  styleUrls: ['./port-list-entry.component.scss']
})
export class PortListEntryComponent implements OnInit {

  @Input() host!: Host;
  @Input() port!: Port;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  edit() {
    this.router.navigate(['port', this.port._id]);
  }

}
