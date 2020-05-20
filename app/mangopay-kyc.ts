import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {Injectable} from '@angular/core';
@Injectable({ providedIn: 'root' })
export class MangopayKyc {

    public clientId:string = 'CLIENTID';
    public apiKey:string = 'APIKEY';
    public baseUrl:string = 'https://api.sandbox.mangopay.com';
    public userID:string = "";

    public filestring:string;
    public files;
    public type;

    public docValid1 = false;
    public docValid2 = false;
    public docValid3 = false;
    public docValid4 = false;

    public onload = false;

    constructor(
        public http:HttpClient,
        public router: Router
    ){
        
    }

    createLegaleUser(value){

        let body = {
            "HeadquartersAddress": {
                "AddressLine1": value.HQAddressLine1,
                "AddressLine2": value.HQAddressLine2,
                "City": value.HQCity,
                "Region": value.HQRegion,
                "PostalCode": value.HQPostalCode,
                "Country": value.HQCountry
            },
            "LegalPersonType": "BUSINESS",
            "Name": value.Name,
            "LegalRepresentativeAddress": {
                "AddressLine1": value.AddressLine1,
                "AddressLine2":value.AddressLine2,
                "City": value.City,
                "Region": value.Region,
                "PostalCode": value.PostalCode,
                "Country": value.Country
            },
            "LegalRepresentativeBirthday": (Date.parse(value.Birthdate))/1000,
            "LegalRepresentativeCountryOfResidence": value.Country,
            "LegalRepresentativeNationality": value.BirthCountry,
            "LegalRepresentativeEmail": value.LegalRepresentativeEmail,
            "LegalRepresentativeFirstName": value.LegalRepresentativeFirstName,
            "LegalRepresentativeLastName": value.LegalRepresentativeLastName,
            "Email": value.LegalRepresentativeEmail,
            "CompanyNumber": value.CompanyNumber
            }

            let url = "/v2.01/"+this.clientId+"/users/legal/";
            const header = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Authorization', 'Basic '+btoa(this.clientId+':'+this.apiKey))

            this.http.post(this.baseUrl+url, body, {headers:header}).subscribe(datas=>{
                console.log(datas);
                let res:any = datas;
                this.createUbo(value,res.Id);
                
            });


    }

    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.filestring = btoa(binaryString);  // Converting binary string data.
        let url = "/v2.01/"+this.clientId+"/users/"+this.userID+"/kyc/documents/";
        const header = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Authorization', 'Basic '+btoa(this.clientId+':'+this.apiKey))
        let body = {
            Type:this.type
        }
        this.http.post(this.baseUrl+url, body, {headers:header}).subscribe(datas=>{
            console.log(datas);
            let res:any = datas;

            let url = "/v2.01/"+this.clientId+"/users/"+this.userID+"/kyc/documents/"+res.Id+"/pages/";
            const header = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Authorization', 'Basic '+btoa(this.clientId+':'+this.apiKey))
        
            let body = {
                File:this.filestring
            }
            this.http.post(this.baseUrl+url, body, {headers:header}).subscribe(post=>{
                console.log(post);

                let url = "/v2.01/"+this.clientId+"/users/"+this.userID+"/kyc/documents/"+res.Id;
                const header = new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', 'Basic '+btoa(this.clientId+':'+this.apiKey))
                let body = {
                    Status:"VALIDATION_ASKED"
                }
                this.http.put(this.baseUrl+url, body, {headers:header}).subscribe(valid=>{
                    console.log('put OK !');
                    console.log(valid);

                    switch(this.type){
                        case "REGISTRATION_PROOF":
                            this.docValid1 = true;
                            console.log('doc Valid 1');
                            break;
                            case "IDENTITY_PROOF":
                                this.docValid2 = true;
                                console.log('doc Valid 2');
                                break;
                                case "ADDRESS_PROOF":
                                    this.docValid3 = true;
                                    console.log('doc Valid 3');
                                    break;
                                    case "ARTICLES_OF_ASSOCIATION":
                                        this.docValid4 = true;
                                        console.log('doc Valid 4');
                                        break;
                                        
                    }
                    this.onload = false;

                },error=>{
                    console.log(error)
                    this.onload = false;
                },()=>{
                    console.log('complete')
                });

            },error=>{
                console.log(error);
                this.onload = false;
            },()=>{
                console.log('complete');
            })

            },error=>{
                console.log(error);
                this.onload = false;

            },()=>{
                console.log('complete');
            })
    }

    createUbo(value,userId){

        let url = "/v2.01/"+this.clientId+"/users/"+userId+"/kyc/ubodeclarations/";
        const header = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Authorization', 'Basic '+btoa(this.clientId+':'+this.apiKey))
        let body = {
        }
        this.http.post(this.baseUrl+url, body, {headers:header}).subscribe(datas=>{
            
            let res:any = datas;
            let DeclarationId = res.Id;

            let url = "/v2.01/"+this.clientId+"/users/"+userId+"/kyc/ubodeclarations/"+res.Id+"/ubos";
            const header = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Authorization', 'Basic '+btoa(this.clientId+':'+this.apiKey))
            let body = {
                "FirstName": value.LegalRepresentativeFirstName,
                "LastName": value.LegalRepresentativeLastName,
                "Address": {
                "AddressLine1": value.AddressLine1,
                "AddressLine2": value.AddressLine2,
                "City": value.City,
                "Region": value.Region,
                "PostalCode": value.PostalCode,
                "Country": value.Country
                },
                "Nationality": value.BirthCountry,
                "Birthday": (Date.parse(value.Birthdate))/1000,
                "Birthplace": {
                "City": value.City, // A remplacer par city naissance 
                "Country": value.BirthCountry
                }
            }
            this.http.post(this.baseUrl+url, body, {headers:header}).subscribe(datas=>{

                let res:any = datas;
                console.log('before put');
                console.log(res);
                let url = "/v2.01/"+this.clientId+"/users/"+userId+"/kyc/ubodeclarations/"+DeclarationId;
                const header = new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', 'Basic '+btoa(this.clientId+':'+this.apiKey))
                let body = {
                    Status:"VALIDATION_ASKED"
                }
                this.http.put(this.baseUrl+url, body, {headers:header}).subscribe(datas=>{
                    console.log('last step');
                    console.log(datas);
                    this.router.navigate(['formstep2'],{queryParams: {userId:userId}});
                })
            })

        })
    }

    createDocument(type,event){

        this.onload = true;
        this.type = type;
        this.files = event.target.files;
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.files[0]);

        

    }



}
