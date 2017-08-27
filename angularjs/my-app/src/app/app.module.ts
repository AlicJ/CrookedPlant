import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InputComponent } from './input.component';
import { CalendarMonthComponent } from './calendar.month.component';
import { CalendarYearComponent } from './calendar.year.component';
import { CalendarDayComponent } from './calendar.day.component';
import { SettingsComponent } from './settings.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
  	InputComponent,
  	CalendarMonthComponent,
    CalendarYearComponent,
    CalendarDayComponent,
  	SettingsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
    	{ path: '', redirectTo: '/input', pathMatch: 'full' },
	    { path: 'input', component: InputComponent },
	    { path: 'calendar/month', component: CalendarMonthComponent},
          { path: 'calendar/year', component: CalendarYearComponent },
          { path: 'calendar/day', component: CalendarDayComponent },
          { path: 'calendar/month', component: CalendarMonthComponent },
	    { path: 'settings',	component: SettingsComponent },
      { path: '**', component: InputComponent }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
