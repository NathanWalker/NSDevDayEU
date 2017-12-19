import { isIOS } from "platform";
import { VenueService } from "./services/venue.service";
import { SpeakerService } from "./services/speaker.service";
import { SessionService } from "./services/session.service";
import { EventService } from "./services/event.service";
import { AnalyticsService } from "./services/analytics.service";
import { NgModule, NO_ERRORS_SCHEMA, enableProdMode } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";

import {
  NativeScriptRouterModule,
  NSModuleFactoryLoader
} from "nativescript-angular/router";

import { AppRoutes, AppComponents } from "./app.routing";

import { AppComponent } from "./app.component";

import { Http } from "@angular/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// for AoT compilation
export function translateLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "/i18n/", ".json");
}
declare var GMSServices: any;
if (isIOS) {
  GMSServices.provideAPIKey("AIzaSyAIc5BA-668i-D7V_pnAnlyeQmX6OsWN8U");
}
enableProdMode();

@NgModule({
  declarations: [AppComponent, ...AppComponents],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(AppRoutes),
    TNSFontIconModule.forRoot({
      fa: "assets/css/font-awesome-vendor.css"
    }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [Http],
        useFactory: translateLoaderFactory
      }
    })
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
export class AppModule {}
