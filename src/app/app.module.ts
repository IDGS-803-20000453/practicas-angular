import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DistanciaComponent } from './src/app/utl/distancia/distancia.component';
import { DistanciaModule } from './src/app/utl/distanc/distancia.module';
import { CinepolisComponent } from './src/app/utl/cinepolis/cinepolis.component';
import { CinepolisModule } from './src/app/utl/cinepo/cinepolis.module';
import { ResistenciaComponent } from './src/app/utl/resistencia/resistencia.component';
import { ResistenciaModule } from './src/app/utl/resis/resistencia.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DistanciaModule,
    CinepolisModule,
    ResistenciaModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
