import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-http-test',
  templateUrl: './http-test.component.html',
  styleUrls: ['./http-test.component.scss']
})
export class HttpTestComponent implements OnInit {

  tulos = 'Moro';
  apitulos = '';
  apiosoite = 'http://media.mw.metropolia.fi/wbma';
  kuvaosoite = 'http://media.mw.metropolia.fi/wbma/uploads/';
  busosoite = 'http://api.digitransit.fi/realtime/vehicle-positions/v1/hfp/journey/+/+/2550/#';
  testiosoite = 'http://api.hel.fi/linkedevents/v1/keyword/?format=json';
  paikkaosoite = 'http://api.hel.fi/linkedevents/v1/place/?format=json';
  eventtiosoite = 'http://api.hel.fi/linkedevents/v1/event/?include=location%2ckeywords/?format=json';
  tulokset: any;
  osoitteet: any;
  eventit: any;


  constructor(private http: HttpClient) { }

  getJson() {

      interface ObjectInterface {
          license: string;
      }

      this.http.get<ObjectInterface>('assets/package.json').subscribe(data => {
          console.log(data);
          this.tulos = data.license;
      });

  }

/*  getFromApi() {

        this.http.get(this.apiosoite + '/media').subscribe( data => {
            console.log(data[0].filename);
            this.apitulos = this.kuvaosoite + data[0].filename;
        });
    }*/

    eventSearch() {

        this.http.get(this.testiosoite).subscribe( data => {
            console.log(data);
            this.tulokset = data.data;
        });

        this.http.get(this.paikkaosoite).subscribe( data => {
            console.log(data);
            this.osoitteet = data.data;
        });

        this.http.get(this.eventtiosoite).subscribe( data => {
            console.log(data);
            this.eventit = data.data;
        });
    }

  ngOnInit() {
    this.getJson();
//    this.getFromApi();
    this.eventSearch();
  }

}
