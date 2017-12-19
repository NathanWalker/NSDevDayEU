import { SessionComponent } from "./components/session/session.component";
import { ConferenceComponent } from "./components/conference/conference.component";
import { HomeComponent } from "./components/home/home.component";
import { WorkshopComponent } from "./components/workshop/workshop.component";
import { SpeakersComponent } from "./components/speakers/speakers.component";
import { SpeakerComponent } from "./components/speaker/speaker.component";
import { MapComponent } from "./components/map/map.component";
import { VenueComponent } from "./components/venue/venue.component";
import { AboutComponent } from "./components/about/about.component";
import { FeedbackComponent } from "./components/feedback/feedback.component";

export const AppRoutes: any = [
  { path: "", component: HomeComponent },
  { path: "workshop", component: WorkshopComponent },
  { path: "conference", component: ConferenceComponent },
  { path: "session/:id", component: SessionComponent },
  { path: "speakers", component: SpeakersComponent },
  { path: "speaker/:id", component: SpeakerComponent },
  { path: "venues", component: VenueComponent },
  { path: "map", component: MapComponent },
  { path: "map/:id", component: MapComponent },
  { path: "about", component: AboutComponent },
  { path: "feedback", component: FeedbackComponent }
];

export const AppComponents: any = [
  HomeComponent,
  WorkshopComponent,
  ConferenceComponent,
  SessionComponent,
  SpeakersComponent,
  SpeakerComponent,
  VenueComponent,
  MapComponent,
  AboutComponent,
  FeedbackComponent
];
