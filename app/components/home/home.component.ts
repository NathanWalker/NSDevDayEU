// Angular
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Location } from "@angular/common";

import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { AnalyticsService } from "../../services/analytics.service";

import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { setString, getString } from "tns-core-modules/application-settings";

import { Config } from "../../shared/config";
import * as appversion from "nativescript-appversion";
import { isIOS, device, screen } from "tns-core-modules/platform";

import * as Http from 'tns-core-modules/http';

@Component({
  moduleId: module.id,
  selector: "home",
  templateUrl: "home.component.html"
})
export class HomeComponent implements OnInit {
  constructor(
    private page: Page,
    private router: Router,
    private translateService: TranslateService,
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this._getData();
    this._storeDeviceData();
  }

  ngAfterViewInit() {
    this.analyticsService.sendAnalytics("home");
  }

  private _storeDeviceData() {
    let lDeviceJson = {
      device_uuid: device.uuid,
      app_version_code: appversion.getVersionCodeSync(),
      app_version_name: appversion.getVersionNameSync(),
      device_type: device.deviceType,
      device_language: device.language,
      device_manufacturer: device.manufacturer,
      device_model: device.model,
      device_os: device.os,
      device_os_version: device.osVersion,
      device_sdk: device.sdkVersion,
      device_screen_scale: screen.mainScreen.scale,
      device_screen_height_dips: screen.mainScreen.heightDIPs,
      device_screen_height_pixels: screen.mainScreen.heightPixels,
      device_screen_width_dips: screen.mainScreen.widthDIPs,
      device_screen_width_pixels: screen.mainScreen.widthPixels
    };
    setString("deviceJson", JSON.stringify(lDeviceJson));
  }

  private _getData() {
    let lMessage: string;
    this.translateService
      .get("ALERTS.NO_INTERNET", {})
      .subscribe((res: string) => {
        lMessage = res;
      });

    let lVersion: number = 0;
    let lData = getString("dataJson");
    if (lData !== undefined) {
      lVersion = JSON.parse(lData).version;
    }
    // console.log(lVersion);

    if (getString("dataJson") === undefined) {
      let defaultData = require("./../../data/default.json");
      setString("dataJson", JSON.stringify(defaultData));
    }

    Http.request({
      url: Config.apiUrl + "data/",
      method: "GET",
      headers: {
        Authorization: "Basic " + Config.apiAuthorization,
        "Content-Type": "application/json",
        "X-Version": lVersion
      }
    }).then(
      function (response) {
        // console.log(response.statusCode);
        switch (response.statusCode) {
          case 200:
            // new data available, replace current
            let result = response.content.toJSON();
            // console.log(response.statusCode);
            // console.log(JSON.stringify(result));
            setString("dataJson", JSON.stringify(result));
            break;
          case 204:
            // do nothing: latest data available
            // console.log(response.statusCode);
            break;
          default:
            // other http status, load default data if none available
            dialogs.alert(lMessage);
        }
      },
      function (e) {
        // error occured, load default data if none available
        // console.log(e);
        if (getString("dataJson") === undefined) {
          let defaultData = require("./../../data/default.json");
          console.log(defaultData);
          setString("dataJson", JSON.stringify(defaultData));
        }
        dialogs.alert(lMessage);
      }
      );
  }

  goToPage(url: string) {
    this.router.navigate([url]);
  }
}
