import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserAnswersDetailComponent } from './user-answers-detail/user-answers-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserAnswersDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
