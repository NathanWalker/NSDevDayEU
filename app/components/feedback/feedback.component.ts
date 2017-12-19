// Angular
import { Location } from "@angular/common";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Page } from "ui/page";
import { TranslateService } from "@ngx-translate/core";
import { AnalyticsService } from "../../services/analytics.service";

import { Config } from "../../shared/config";

let validator = require("email-validator");
let Http = require("http");

@Component({
  moduleId: module.id,
  selector: "feedback",
  templateUrl: "feedback.component.html"
})
export class FeedbackComponent implements OnInit {
  _name: string = "";
  _email: string = "";
  _feedback: string = "";

  private _msgRequired: string;
  private _msgValidEmail: string;
  private _msgSuccess: string;

  constructor(
    private location: Location,
    private page: Page,
    private translateService: TranslateService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.translateService
      .get("ALERTS.ALL_FIElDS_REQUIRED", {})
      .subscribe((res: string) => {
        this._msgRequired = res;
      });
    this.translateService
      .get("ALERTS.VALID_EMAIL", {})
      .subscribe((res: string) => {
        this._msgValidEmail = res;
      });
    this.translateService
      .get("FEEDBACK.MSG_THANKS", {})
      .subscribe((res: string) => {
        this._msgSuccess = res;
      });
  }

  ngAfterViewInit() {
    this.analyticsService.sendAnalytics("feedback");
  }

  sendFeedback() {
    if (
      this._name.length == 0 ||
      this._email.length == 0 ||
      this._feedback.length == 0
    ) {
      alert(this._msgRequired);
    } else {
      let isValidEmail = validator.validate(this._email);
      if (!isValidEmail) {
        alert(this._msgValidEmail);
      } else {
        Http.request({
          url: Config.apiUrl + "/feedback/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + Config.apiAuthorization
          },
          content: JSON.stringify({
            name: this._name,
            email: this._email,
            feedback: this._feedback
          })
        }).then(
          function(response) {
            // result = response.content.toJSON();
            if (response.statusCode === 204) {
              // alert(this._msgSuccess);
              alert("Thank you for your feedback!");
            } else {
              alert(response.statusCode);
            }
          },
          function(e) {
            console.log("Error occurred " + e);
          }
        );
      }
    }
  }

  goBack() {
    this.page.actionBarHidden = true;
    this.location.back();
  }
}
