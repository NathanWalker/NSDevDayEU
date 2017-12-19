// Angular
import { Location } from "@angular/common";
import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
import { Router, ActivatedRoute } from "@angular/router";

import { Venue } from "./../../models/venue.model";
import { VenueService } from "./../../services/venue.service";
import { AnalyticsService } from "../../services/analytics.service";

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => MapView);

@Component({
  moduleId: module.id,
  selector: "map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit {
  venueId: number;
  venue: Venue;

  latitude: number;
  longitude: number;

  zoom = 17;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];
  mapView: MapView;

  lastCamera: String;

  constructor(
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private venueService: VenueService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.venueId = +this.activatedRoute.snapshot.params["id"];
    this.venue = this.venueService.getVenueById(this.venueId);
    this.latitude = this.venue.latitude;
    this.longitude = this.venue.longitude;
  }

  ngAfterViewInit() {
    this.analyticsService.sendAnalytics("map");
  }

  onMapReady(event) {
    // console.log("Map Ready");

    this.mapView = event.object;
    this.mapView.settings.zoomControlsEnabled = true;

    // console.log("Setting a marker...");

    var marker = new Marker();
    marker.position = Position.positionFromLatLng(
      this.latitude,
      this.longitude
    );
    marker.title = this.venue.name;
    marker.snippet =
      this.venue.address +
      "\n" +
      this.venue.zipcode +
      " " +
      this.venue.city +
      "\n" +
      this.venue.country;
    marker.userData = { index: 1 };
    this.mapView.addMarker(marker);
  }

  onCoordinateTapped(args) {
    // console.log(
    //   "Coordinate Tapped, Lat: " +
    //     args.position.latitude +
    //     ", Lon: " +
    //     args.position.longitude,
    //   args
    // );
  }

  onMarkerEvent(args) {
    // console.log(
    //   "Marker Event: '" +
    //     args.eventName +
    //     "' triggered on: " +
    //     args.marker.title +
    //     ", Lat: " +
    //     args.marker.position.latitude +
    //     ", Lon: " +
    //     args.marker.position.longitude,
    //   args
    // );
  }

  onCameraChanged(args) {
    // console.log(
    //   "Camera changed: " + JSON.stringify(args.camera),
    //   JSON.stringify(args.camera) === this.lastCamera
    // );
    this.lastCamera = JSON.stringify(args.camera);
  }

  goBack() {
    this.location.back();
  }
}
