// Angular
import { Location } from "@angular/common";

import { Session } from "./../../models/session.model";
import { SessionService } from "./../../services/session.service";
import { Venue } from "./../../models/venue.model";
import { VenueService } from "./../../services/venue.service";
import { Event } from "./../../models/event.model";
import { EventService } from "./../../services/event.service";
import { AnalyticsService } from "../../services/analytics.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";

@Component({
  moduleId: module.id,
  selector: "conference",
  templateUrl: "conference.component.html"
})
export class ConferenceComponent implements OnInit {
  sessions: Array<Session>;
  venue: Venue;
  event: Event;

  constructor(
    private router: Router,
    private location: Location,
    private page: Page,
    private venueService: VenueService,
    private sessionService: SessionService,
    private eventService: EventService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.event = this.eventService.getEventDay(2);
    this.venue = this.venueService.getVenueById(this.event.venue);
    this.sessions = this.sessionService.getSessionsExcludingType("WORKSHOP");
  }

  ngAfterViewInit() {
    this.analyticsService.sendAnalytics("conference");
  }

  goBack() {
    this.page.actionBarHidden = true;
    this.location.back();
  }
}
