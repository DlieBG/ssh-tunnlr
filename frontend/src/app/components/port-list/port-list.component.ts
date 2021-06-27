import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Host } from 'src/app/interfaces/host';

@Component({
  selector: 'app-port-list',
  templateUrl: './port-list.component.html',
  styleUrls: ['./port-list.component.scss']
})
export class PortListComponent implements OnInit {

  @Input() host!: Host;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  newPort() {
    this.router.navigate(['host', this.host._id, 'port']);
  }

}
