import { Injectable } from "@angular/core";
import { getString } from "application-settings";
import { Config } from "../shared/config";

let Http = require("http");

@Injectable()
export class AnalyticsService {
  private _events: Array<Event> = [];

  constructor() {}

  sendAnalytics(page: string) {
    Http.request({
      url: Config.apiUrl + "/analytics/",
      method: "POST",
      headers: {
        Authorization: "Basic " + Config.apiAuthorization,
        "Content-Type": "application/json",
        "X-Page": page
      },
      content: getString("deviceJson")
    }).then(
      function(response) {
        // console.log(response.statusCode);
      },
      function(e) {
        // console.log("Error occurred " + e);
      }
    );
  }
}
