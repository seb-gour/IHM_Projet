import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CabinetMedicalService } from './cabinet-medical.service';
import { SecretaryComponent } from './secretary/secretary.component';
import { InfirmierComponent } from './infirmier/infirmier.component';
import { PatientComponent } from './patient/patient.component';
import {RouterModule,Router} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    InfirmierComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', component: SecretaryComponent},
      {path: 'secretary', component: SecretaryComponent},
      {path: 'infirmier', component: InfirmierComponent},
      {path: 'patient', component: PatientComponent},
    ])
  ],
  providers: [CabinetMedicalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
