import { Session } from "./../models/session.model";
import { Injectable } from "@angular/core";
import { getString } from "application-settings";

import * as _ from "lodash";

@Injectable()
export class SessionService {
  private _sessions: Array<Session> = [];

  constructor() {
    let dataJson = getString("dataJson");
    this._sessions = JSON.parse(dataJson).sessions;
  }

  private _dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function(a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  getSessions(): Session[] {
    return this._sessions;
  }

  getSession(id: number): Session {
    return this._sessions.filter(session => session.id === id)[0];
  }

  getSessionsBySpeaker(id: number) {
    return _.filter(this._sessions, { speaker: [{ id: id }] });
  }

  getSessionsByType(type: string) {
    return _.filter(this._sessions, { type: type });
  }

  getSessionsExcludingType(type: string) {
    this._sessions.sort(this._dynamicSort("start"));
    return _.filter(this._sessions, function(value) {
      return value.type !== type;
    });
  }
}
