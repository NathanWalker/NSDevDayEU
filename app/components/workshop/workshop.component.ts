// Angular
import { Location } from "@angular/common";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "./../../services/session.service";
import { SpeakerService } from "./../../services/speaker.service";
import { VenueService } from "./../../services/venue.service";
import { Venue } from "./../../models/venue.model";
import { Session } from "./../../models/session.model";
import { Speaker } from "./../../models/speaker.model";
import { Event } from "./../../models/event.model";
import { EventService } from "./../../services/event.service";
import { Page } from "ui/page";
import { AnalyticsService } from "../../services/analytics.service";

@Component({
  moduleId: module.id,
  selector: "workshop",
  templateUrl: "workshop.component.html"
})
export class WorkshopComponent implements OnInit {
  venue: Venue;
  session: Session;
  speakers: Array<Speaker> = [];
  event: Event;

  public constructor(
    private router: Router,
    private location: Location,
    private page: Page,
    private venueService: VenueService,
    private sessionService: SessionService,
    private speakerService: SpeakerService,
    private eventService: EventService,
    private analyticsService: AnalyticsService
  ) {}

  public ngOnInit() {
    this.event = this.eventService.getEventDay(1);
    this.venue = this.venueService.getVenueById(this.event.venue);
    this.session = this.sessionService.getSessionsByType("WORKSHOP")[0];
    this.session.speaker.forEach(speaker => {
      this.speakers.push(this.speakerService.getSpeakerById(speaker.id));
    });
  }

  ngAfterViewInit() {
    this.analyticsService.sendAnalytics("workshop");
  }

  goBack() {
    this.page.actionBarHidden = true;
    this.location.back();
  }
}
