import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { COMPONENTS } from './components/component';
import { CONTAINERS } from './containers/containers';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
    // ...CONTAINERS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
