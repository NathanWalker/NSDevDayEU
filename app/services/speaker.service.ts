import { Injectable } from "@angular/core";
import { Speaker } from "./../models/speaker.model";
import { getString } from "application-settings";

declare var Promise: any;

@Injectable()
export class SpeakerService {
  private _speakers: Array<Speaker> = [];

  constructor() {
    let dataJson = getString("dataJson");
    this._speakers = JSON.parse(dataJson).speakers;
  }

  private _dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  getSpeakers(): Speaker[] {
    this._speakers.sort(this._dynamicSort('name'));
    return this._speakers;
  }

  getSpeakerById(id: number): Speaker {
    if (!id) {
      return;
    }

    return this._speakers.filter((speaker) => {
      return speaker.id === id;
    })[0];
  }

}
