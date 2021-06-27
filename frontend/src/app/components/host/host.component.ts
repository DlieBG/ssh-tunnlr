import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Host } from 'src/app/interfaces/host';
import { HostService } from 'src/app/services/host/host.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {

  host$!: Observable<Host>;
  host!: Host;

  constructor(private hostService: HostService, private activatedRoute: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, public location: Location) {
    this.location.subscribe((event) => {
      if(!this.host._id && event.pop)
        this.location.back();
   }); 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params.hostId)
        this.getHost(params.hostId);
      else
        this.host = {
          port: 22,
          active: true,
          name: 'New Tunnlr'
        } as Host;
    });
  }

  getHost(hostId: string) {
    this.host$ = this.hostService.getHost(hostId);
    this.host$.subscribe(
      (data) => {
        this.host = data;
      },
      (err) => {

      }
    );
  }

  save() {
    if(!this.host._id)
      this.hostService.postHost(this.host).subscribe(
        (data) => {
          this.snackBar.open('Host angelegt!', 'ok', { duration: 1500 });
          this.router.navigate(['host', data.insertedId]);
        },
        (err) => {

        }
      );
    else
      this.hostService.putHost(this.host).subscribe(
        (data) => {
          this.snackBar.open('Gespeichert!', 'ok', { duration: 1500 });
        },
        (err) => {

        }
      );
  }

  delete() {
    this.hostService.deleteHost(this.host._id).subscribe(
      (data) => {
        this.snackBar.open('Gelöscht!', 'ok', { duration: 1500 });
        this.router.navigate(['']);
      },
      (err) => {

      }
    );
  }

}
