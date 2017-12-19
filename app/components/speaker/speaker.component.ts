// Angular
import { Location } from "@angular/common";
import { SpeakerService } from "./../../services/speaker.service";
import { SessionService } from "./../../services/session.service";
import { Speaker } from "./../../models/speaker.model";
import { Session } from "./../../models/session.model";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AnalyticsService } from "../../services/analytics.service";

let utils = require("utils/utils");

@Component({
  moduleId: module.id,
  selector: "speaker",
  templateUrl: "speaker.component.html"
})
export class SpeakerComponent implements OnInit {
  speaker: Speaker;
  speakerId: number;
  sessions: Array<Session>;

  constructor(
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private speakerService: SpeakerService,
    private sessionService: SessionService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.speakerId = +this.activatedRoute.snapshot.params["id"];
    this.speaker = this.speakerService.getSpeakerById(this.speakerId);
    this.sessions = this.sessionService.getSessionsBySpeaker(this.speakerId);
  }

  ngAfterViewInit() {
    this.analyticsService.sendAnalytics("speaker " + this.speakerId);
  }

  openUrl(args) {
    utils.openUrl(args.object.url);
  }

  goBack() {
    this.location.back();
  }
}
