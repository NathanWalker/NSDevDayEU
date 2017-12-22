import { isIOS } from "tns-core-modules/platform";
import { VenueService } from "./services/venue.service";
import { SpeakerService } from "./services/speaker.service";
import { SessionService } from "./services/session.service";
import { EventService } from "./services/event.service";
import { AnalyticsService } from "./services/analytics.service";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";

import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppRoutes, AppComponents } from "./app.routing";

import { AppComponent } from "./app.component";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TNSTranslateLoader } from './utils/tns-translate-loader';

// for AoT compilation
export function createTranslateLoader() {
  return new TNSTranslateLoader('/assets/i18n/');
}
declare var GMSServices: any;
if (isIOS) {
  GMSServices.provideAPIKey("AIzaSyAIc5BA-668i-D7V_pnAnlyeQmX6OsWN8U");
}

@NgModule({
  declarations: [AppComponent, ...AppComponents],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    // NativeScriptFormsModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(AppRoutes),
    TNSFontIconModule.forRoot({
      fa: "./assets/css/font-awesome-vendor.css"
    }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
      },
    }),
  ],
  providers: [
    SessionService,
    SpeakerService,
    VenueService,
    EventService,
    AnalyticsService
  ],

  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
