import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {Adresse} from "../dataInterfaces/adress";
import {sexeEnum} from "../dataInterfaces/sexe";
import {PatientInterface} from "../dataInterfaces/patient";
import {InfirmierInterface} from "../dataInterfaces/nurse";

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecretaryComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
