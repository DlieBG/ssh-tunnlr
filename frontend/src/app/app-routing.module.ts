import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HostListComponent } from './components/host-list/host-list.component';
import { HostComponent } from './components/host/host.component';

const routes: Routes = [
  { path: '', component: HostListComponent },
  { path: 'host/:hostId', component: HostComponent },
  { path: 'port/:portId', component: HostComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
