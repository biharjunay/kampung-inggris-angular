import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withI18nSupport } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ExtendedHttpInterceptor } from './services/extended-http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '@services/alert.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExtendedHttpInterceptor,
      multi: true
    },
    BsModalService,
    provideClientHydration(withI18nSupport())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
