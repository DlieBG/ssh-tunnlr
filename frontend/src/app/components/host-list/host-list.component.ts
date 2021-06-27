import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Host } from 'src/app/interfaces/host';
import { Port } from 'src/app/interfaces/port';
import { HostService } from 'src/app/services/host/host.service';

@Component({
  selector: 'app-host-list',
  templateUrl: './host-list.component.html',
  styleUrls: ['./host-list.component.scss']
})
export class HostListComponent implements OnInit {

  hosts$!: Observable<Host[]>;
  hosts!: Host[];

  constructor(private hostService: HostService) { }

  ngOnInit(): void {
    this.getHosts();
  }

  getHosts() {
    this.hosts$ = this.hostService.getHosts();
    this.hosts$.subscribe(
      (data) => {
        this.hosts = data;
      },
      (err) => {

      }
    );
  }

}
