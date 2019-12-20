export class Satellite {
    name: string;
    orbitType: string;
    type: string;
    operational: boolean;
    launchDate: string;
    constructor(name: string, type: string, launchDate: string, orbitType: string, operational: boolean){
        this.name = name;
        this.orbitType = orbitType;
        this.type = type;
        this.operational = operational;
        this.launchDate = launchDate;
    }

    /**
     * returns true if the satellite type is 'Space Debris',
     * and it returns false otherwise. Note that this check should be case-insensitive.
     */
    shouldShowWarning():boolean{
        return (this.type.toLowerCase() === "space debris");
    } 
}
