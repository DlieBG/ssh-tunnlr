import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HostListComponent } from './components/host-list/host-list.component';
import { PortListComponent } from './components/port-list/port-list.component';
import { HostListEntryComponent } from './components/host-list/host-list-entry/host-list-entry.component';
import { PortListEntryComponent } from './components/port-list/port-list-entry/port-list-entry.component';
import { HostComponent } from './components/host/host.component';
import { PortComponent } from './components/port/port.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HostListComponent,
    PortListComponent,
    HostListEntryComponent,
    PortListEntryComponent,
    HostComponent,
    PortComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
