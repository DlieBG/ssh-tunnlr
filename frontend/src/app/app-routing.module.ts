import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HostListComponent } from './components/host-list/host-list.component';
import { HostComponent } from './components/host/host.component';
import { PortComponent } from './components/port/port.component';

const routes: Routes = [
  { path: '', component: HostListComponent },

  { path: 'host', component: HostComponent },
  { path: 'host/:hostId', component: HostComponent },

  { path: 'host/:hostId/port', component: PortComponent },
  { path: 'port/:portId', component: PortComponent },

  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
