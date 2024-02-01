import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { IrisService } from '../services/iris.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public auth: AuthService,
      public irisService: IrisService,
      private router: Router
    ) {}

  testGetAPI() {
    this.irisService.getPatient().subscribe({next: res => {  
        console.log(JSON.stringify(res));
    },
    error: err => {
        console.error(JSON.stringify(err));
    }
    });
}

testPostAPI() {
    const patientData = {
    "resourceType": "Patient",
    "address": [
        {
            "city": "SALAMANCA",
            "line": [
                "CALLE LAMENTOS 2 1ºA"
            ],
            "postalCode": "45021"
        }
    ],
    "birthDate": "1988-01-23",
    "gender": "female",
    "identifier": [
        {
            "type": {
                "text": "ID"
            },
            "value": "4"
        },
        {
            "type": {
                "text": "NHC"
            },
            "value": "803987"
        },
        {
            "type": {
                "text": "DNI"
            },
            "value": "87654321F"
        }
    ],
    "name": [
        {
            "family": "SANZ LÓPEZ",
            "given": [
                "REBECA"
            ]
        }
    ],
    "telecom": [
        {
            "system": "phone",
            "value": "699850017"
        },
        {
            "system": "email",
            "value": "rebek1988@hotmail.com"
        }
    ]
    };

    this.irisService.savePatient(patientData).subscribe({next: res => {  
    console.log(JSON.stringify(res));
    },
    error: err => {
    console.error(JSON.stringify(err));
    }
    });
}

open( redirection: String ) {
  this.router.navigate([redirection]);
}

}
