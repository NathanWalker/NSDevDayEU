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
  selector: "venue",
  templateUrl: "venue.component.html"
})
export class VenueComponent implements OnInit {
  event_workshop: Event;
  event_conference: Event;
  venue_workshop: Venue;
  venue_conference: Venue;

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
    this.event_workshop = this.eventService.getEventDay(1);
    this.venue_workshop = this.venueService.getVenueById(
      this.event_workshop.venue
    );
    this.event_conference = this.eventService.getEventDay(2);
    this.venue_conference = this.venueService.getVenueById(
      this.event_conference.venue
    );
  }

  ngAfterViewInit() {
    this.analyticsService.sendAnalytics("venues");
  }

  goBack() {
    this.page.actionBarHidden = true;
    this.location.back();
  }
}
