// Angular
import { Location } from "@angular/common";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";

import { Speaker } from "./../../models/speaker.model";
import { SpeakerService } from "./../../services/speaker.service";
import { AnalyticsService } from "../../services/analytics.service";

@Component({
  moduleId: module.id,
  selector: "speakers",
  templateUrl: "speakers.component.html"
})
export class SpeakersComponent implements OnInit {
  speakers: Array<Speaker> = [];

  constructor(
    private router: Router,
    private location: Location,
    private page: Page,
    private speakerService: SpeakerService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.speakers = this.speakerService.getSpeakers();
  }

  ngAfterViewInit() {
    this.analyticsService.sendAnalytics("speakers");
  }

  goBack() {
    this.page.actionBarHidden = true;
    this.location.back();
  }
}
