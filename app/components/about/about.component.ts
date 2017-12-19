// Angular
import { Location } from "@angular/common";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Page } from "ui/page";
import { AnalyticsService } from "../../services/analytics.service";

@Component({
  moduleId: module.id,
  selector: "about",
  templateUrl: "about.component.html"
})
export class AboutComponent implements OnInit {
  constructor(
    private location: Location,
    private page: Page,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.analyticsService.sendAnalytics("about");
  }

  goBack() {
    this.page.actionBarHidden = true;
    this.location.back();
  }
}
