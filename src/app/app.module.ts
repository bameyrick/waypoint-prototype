import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularOpenlayersModule } from 'ngx-openlayers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JourneyComponent } from './components/journey/journey.component';
import { EpochPipe } from './pipes/epoch.pipe';

@NgModule({
  declarations: [
    AppComponent,
    JourneyComponent,
    EpochPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularOpenlayersModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
