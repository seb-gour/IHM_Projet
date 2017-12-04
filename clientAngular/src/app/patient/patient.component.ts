import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {Adresse} from "../dataInterfaces/adress";
import {sexeEnum} from "../dataInterfaces/sexe";
import {PatientInterface} from "../dataInterfaces/patient";
import {InfirmierInterface} from "../dataInterfaces/nurse";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PatientComponent implements OnInit {
  private cabinet: CabinetInterface;

  constructor(private cs: CabinetMedicalService){
    cs.getData("/data/cabinetInfirmier.xml").then( c => this.cabinet = c );
  }

  public AddPatient(nom : string, prenom : string, naissance : string, sexe : string, numero : string, ad_etage : string, ad_num : string, ad_rue : string, ad_codep : string, ad_ville : string) {
    if(nom != "" && prenom != "" && naissance != "" && sexe != "" && numero != "" && ad_etage != "" && ad_num != "" && ad_rue != "" && ad_codep != "" && ad_ville != "") {
      this.cs.AddPatient(nom, prenom, naissance, sexe, numero, ad_etage, ad_num, ad_rue, ad_codep, ad_ville);
    }
  }

  ngOnInit() {

  }


}
