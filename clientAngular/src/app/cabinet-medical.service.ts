import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {CabinetInterface} from "./dataInterfaces/cabinet";
import {Adresse} from "./dataInterfaces/adress";
import {sexeEnum} from "./dataInterfaces/sexe";
import {PatientInterface} from "./dataInterfaces/patient";
import {InfirmierInterface} from "./dataInterfaces/nurse";
@Injectable()
export class CabinetMedicalService {

  constructor(private http: Http) { }
  getData(url: string): Promise < CabinetInterface > {
    return this.http.get(url).toPromise().then(res => {
      console.log(url, '=>' , res);
      let node: Element;
      const text = res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/xml');
      const infirmiersXML: Element[] = Array.from(doc.querySelectorAll( 'infirmiers > infirmier'));
      const patientsXML: Element[] = Array.from(doc.querySelectorAll( 'patients > patient'));

      const cabinet: CabinetInterface = {
        infirmiers: [],
        patientsNonAffectes : [],
        adresse : this.getAdresseFrom( doc.querySelector(' cabinet > adresse '))
      };

      const infirmiers = infirmiersXML.map(infXML=>{return{
        id: infXML.getAttribute("id"),
        prenom: (node = infXML.querySelector('prénom')) ? node.textContent : '',
        nom: (node = infXML.querySelector('nom')) ? node.textContent : '',
        photo: (node = infXML.querySelector('photo')) ? node.textContent : '',
        patients: [],
        adresse: this.getAdresseFrom(infXML.querySelector('adresse'))
      };
      });

      const patients = patientsXML.map(patXML=>{return{
        prenom: (node = patXML.querySelector('prénom')) ? node.textContent : '',
        nom: (node = patXML.querySelector('nom')) ? node.textContent : '',
        sexe: (patXML.querySelector('sexe').textContent === "m") ? sexeEnum.M : sexeEnum.F,
        numeroSecuriteSociale: (node = patXML.querySelector('numéro')) ? node.textContent : '',
        adresse: this.getAdresseFrom(patXML.querySelector('adresse'))
      };
      });

      const affectations = patientsXML.map(patientXML => {
        const idP = (node = patientXML.querySelector("numéro")) ? node.textContent : '';
        const patient = patients.find(P=>P.numeroSecuriteSociale === idP);
        const intervenant = patientXML.querySelector("visite").getAttribute("intervenant");
        const infirmier = infirmiers.find(i => i.id === intervenant);
        return {
          infirmier: infirmier,
          patient: patient
        };
      });

      affectations.forEach(A => {
        if(A.infirmier){
          A.infirmier.patients.push(A.patient);
        } else {
          cabinet.patientsNonAffectes.push(A.patient);
        }
      });
      cabinet.infirmiers = infirmiers;

      console.log(patients);
      console.log(infirmiers);
      console.log(cabinet);

      return cabinet;
    });
  };

  public getAdresseFrom(adresseXML: Element): Adresse {
    let node: Element;
    return <Adresse>{
      etage: (node = adresseXML.querySelector('étage')) ? node.textContent : '',
      rue: adresseXML.querySelector('rue').textContent,
      numero: (node = adresseXML.querySelector('numéro')) ? node.textContent : '',
      ville : adresseXML.querySelector('ville').textContent,
      codePostal : parseInt(adresseXML.querySelector('codePostal').textContent, 10),
    lat: undefined,
    lng: undefined,
    };
  }

  public AddPatient(nom : string, prenom : string, naissance : string, sexe : string, numero : string, ad_etage : string, ad_num : string, ad_rue : string, ad_codep : string, ad_ville : string) {
    this.http.post("/addPatient", {
      patientName: nom,
      patientForname: prenom,
      patientNumber: numero,
      patientSex: sexe,
      patientBirthday: naissance,
      patientFloor: ad_etage,
      patientStreetNumber: ad_num,
      patientStreet: ad_rue,
      patientPostalCode: ad_codep,
      patientCity: ad_ville
    })
  }

  public AffecterPatient(idInfirmier : string, numPatient : string) {
	this.http.post( "/affectation", {
	  infirmier: idInfirmier,
      patient: numPatient
	});
  }
}
