import { Venue } from "./../models/venue.model";
import { Injectable } from "@angular/core";
import { getString } from "application-settings";

@Injectable()
export class VenueService {
  private _venues: Array<Venue> = [];

  constructor() {
    let dataJson = getString("dataJson");
    this._venues = JSON.parse(dataJson).venues;
  }

  getVenues(): Venue[] {
    return this._venues;
  }

  getVenueById(id: number): Venue {
    return this._venues.filter(venue => venue.id === id)[0];
  }

}
