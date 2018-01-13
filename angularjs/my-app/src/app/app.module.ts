import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { DemoUtilsModule } from './demo-utils/module';

import { AppComponent } from './app.component';
import { InputComponent } from './input.component';
import { CalendarComponent } from './calendar.component';
import { SettingsComponent } from './settings.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
  	InputComponent,
  	CalendarComponent,
  	SettingsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    NgbModule.forRoot(),
    BrowserModule,
    DemoUtilsModule,
    FormsModule,
    RouterModule.forRoot([
    	{ path: '', redirectTo: '/input', pathMatch: 'full' },
	    { path: 'input', component: InputComponent },
	    { path: 'calendar', component: CalendarComponent},
	    { path: 'settings',	component: SettingsComponent },
      { path: '**', component: InputComponent }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
