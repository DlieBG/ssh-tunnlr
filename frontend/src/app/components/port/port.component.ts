import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Port } from 'src/app/interfaces/port';
import { PortService } from 'src/app/services/port/port.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.scss']
})
export class PortComponent implements OnInit {

  hostId!: string;

  port$!: Observable<Port>;
  port!: Port;

  constructor(private portService: PortService, private activatedRoute: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, public location: Location) { 
    this.location.subscribe((event) => {
      if(!this.port._id && event.pop)
        this.location.back();
   }); 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params.portId)
        this.getPort(params.portId);
      if(params.hostId)
      {
        this.hostId = params.hostId;
        this.port = {
          active: true,
          name: 'New Port'
        } as Port;
      }
    });
  }

  getPort(portId: string) {
    this.port$ = this.portService.getPort(portId);
    this.port$.subscribe(
      (data) => {
        this.port = data;
      },
      (err) => {

      }
    );
  }

  save() {
    if(!this.port._id)
      this.portService.postHost(this.port, this.hostId).subscribe(
        (data) => {
          this.snackBar.open('Port angelegt!', 'ok', { duration: 1500 });
          this.router.navigate(['port', data.insertedId]);
        },
        (err) => {

        }
      );
    else
      this.portService.putHost(this.port).subscribe(
        (data) => {
          this.snackBar.open('Gespeichert!', 'ok', { duration: 1500 });
        },
        (err) => {

        }
      );
  }

  delete() {
    this.portService.deleteHost(this.port._id).subscribe(
      (data) => {
        this.snackBar.open('Gelöscht!', 'ok', { duration: 1500 });
        this.location.back();
      },
      (err) => {

      }
    );
  }

}
