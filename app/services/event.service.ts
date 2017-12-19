import { Event } from "./../models/event.model";
import { Injectable } from "@angular/core";
import { getString } from "application-settings";

import * as _ from 'lodash';

@Injectable()
export class EventService {
  private _events: Array<Event> = [];

  constructor() {
    let dataJson = getString("dataJson");
    this._events = JSON.parse(dataJson).events;
  }

  getEventDay(day: number): Event {
    return this._events.filter(event => event.day === day)[0];
  }

}
