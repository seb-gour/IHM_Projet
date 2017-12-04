import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {Adresse} from "../dataInterfaces/adress";
import {sexeEnum} from "../dataInterfaces/sexe";
import {PatientInterface} from "../dataInterfaces/patient";
import {InfirmierInterface} from "../dataInterfaces/nurse";

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css']
})
export class InfirmierComponent implements OnInit {

  private cabinet : CabinetInterface;
  private cs : CabinetMedicalService;

  constructor(cs: CabinetMedicalService) {
    this.cs = cs;
    this.cs.getData("/data/cabinetInfirmier.xml").then( c => this.cabinet = c );
  }

  getInfirmiers(): InfirmierInterface[] {
    return this.cabinet ? this.cabinet.infirmiers : [];
  }

  getPatientsNonAffectes(): PatientInterface[] {
    return this.cabinet ? this.cabinet.patientsNonAffectes : [];
  }

  public AffecterPatient(idInfirmier : string, numPatient : string) {
    this.cs.AffecterPatient(idInfirmier, numPatient);
  }

  public DeaffecterPatient(numPatient : string) {
    this.cs.AffecterPatient("none", numPatient);
  }

  ngOnInit() {

  }

}
