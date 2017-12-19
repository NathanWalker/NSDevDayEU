import { Speaker } from "./../../models/speaker.model";
import { Session } from "./../../models/session.model";
import { SessionService } from "./../../services/session.service";
import { SpeakerService } from "./../../services/speaker.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { AnalyticsService } from "../../services/analytics.service";

let utils = require("utils/utils");

@Component({
  moduleId: module.id,
  selector: "session",
  templateUrl: "session.component.html"
})
export class SessionComponent implements OnInit {
  session: Session;
  speakers: Array<Speaker> = [];
  sessionId: number;

  constructor(
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private sessionService: SessionService,
    private speakerService: SpeakerService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.sessionId = +this.activatedRoute.snapshot.params["id"];
    this.session = this.sessionService.getSession(this.sessionId);
    this.session.speaker.forEach(speaker => {
      this.speakers.push(this.speakerService.getSpeakerById(speaker.id));
    });
  }

  ngAfterViewInit() {
    this.analyticsService.sendAnalytics("session " + this.sessionId);
  }

  openUrl(args) {
    utils.openUrl(args.object.url);
  }

  goBack() {
    this.location.back();
  }
}
