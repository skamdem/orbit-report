import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ListOfOrbitTypes:string[] = ['LOW','HIGH'];
  ListOfTypes: string[] = ['Space Debris', 'Communication', 'Probe', 'Positioning', 'Space Station','Telescope'];
  title = 'orbit-report';
  sourceList:Satellite[];
  displayList:Satellite[];

  /*constructor() {
    this.sourceList = [
       new Satellite("SiriusXM", "Communication", "2009-03-21", "LOW", true),
       new Satellite("Cat Scanner", "Imaging", "2012-01-05", "LOW", true),
       new Satellite("Weber Grill", "Space Debris", "1996-03-25", "HIGH", false),
       new Satellite("GPS 938", "Positioning", "2001-11-01", "HIGH", true),
       new Satellite("ISS", "Space Station", "1998-11-20", "LOW", true),
    ];
 }*/
 constructor() {
    this.displayList = [];
    this.sourceList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
    window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function(data) {
        let fetchedSatellites = data.satellites;
        // TODO: loop over satellites
        for (let i = 0; i < fetchedSatellites.length; i++){
          // TODO: create a Satellite object using new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);            
          let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
          // TODO: add the new Satellite object to sourceList using: this.sourceList.push(satellite);
          this.sourceList.push(satellite);
        }
        this.displayList = this.sourceList.slice(0);
      }.bind(this));
    }.bind(this));

  }

  /**
   * Ordinary search function
   * BEFORE c) in the assignemnt
   */
  /*search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for(let i=0; i < this.sourceList.length; i++) {
      let name = this.sourceList[i].name.toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
      }
    }
    // assign this.displayList to be the the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
  }*/

  /* 
   * C) Updated Search Feature with Modified search feature
   * to find matches using the orbitType and type properties.
   */
  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();

    for(let i=0; i < this.sourceList.length; i++) {
      let name = this.sourceList[i].name.toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
      }
    }
    
    //Find matches using the type property.
    for(let i=0; i < this.ListOfTypes.length; i++) {
      let name = this.ListOfTypes[i].toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites = this.removeDuplicates(matchingSatellites.concat(this.subArrayOfSpecificType(this.sourceList, name)));
      }
    }

    //Find matches using the orbitType property.
    for(let i=0; i < this.ListOfOrbitTypes.length; i++) {
      let name = this.ListOfOrbitTypes[i].toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites = this.removeDuplicates(matchingSatellites.concat(this.subArrayOfSpecificOrbitType(this.sourceList, name)));
      }
    }

    // assign this.displayList to be the the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
  }

  subArrayOfSpecificType(arr:Satellite[], type:string) : Satellite[] {
    return arr.filter(function(el) {
      return el.type.toLowerCase().indexOf(type.toLowerCase()) !== -1;
    });
  }

  subArrayOfSpecificOrbitType(arr:Satellite[], orbitType:string) : Satellite[] {
    return arr.filter(function(el) {
      return el.orbitType.toLowerCase().indexOf(orbitType.toLowerCase()) !== -1;
    });
  }
  
  /**
   * Remove duplicates in an array of satellites while considering the 'name' attribute as unique
   */
  removeDuplicates(array: Satellite[]) : Satellite[] {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i].name === a[j].name)
                a.splice(j--, 1);
        }
    }
    return a;
  }
 
}
