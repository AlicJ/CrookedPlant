import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { DayViewHour } from 'calendar-utils';
import { colors } from './demo-utils/colors';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class CalendarComponent implements OnInit {

  allData = JSON.parse(localStorage.getItem('allData'));
  allDate = []
  allDays = []
  selectedDay = {};

  onSelect(day: Object): void {
    console.log("day selected", this);
    this.selectedDay = day;
  }

  showDayDetail(): void {

  }

  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  dayView: DayViewHour[];
  clickedDate: Date;

  beforeDayViewRender( dayView: DayViewHour[] ) {
    console.log(dayView);
    this.dayView = dayView;
    //this.addSelectedDayViewClass();
  }

  ngOnInit(self = this): void {
    if (!self.allData) throw("Initialize localhost by runnning CrookedPlant/allData.txt");
    
  	$.each(self.allData, function(key, value){
  		self.allDate.push(Object.keys(value)[0]);
  	});
    self.allDays = Object.keys(self.allData); //indices of the array in number
    // $.each(self.allData, function(key, value){
    // 	self.allDays[key]=parseInt(value);
    // })
    // self.allData.reverse();
    console.log(self.allDays);
    var keyVal;
    var tempEventsArr = [];
    self.allData.forEach((e,i) => {
      keyVal = Object.keys(e)[0];
      tempEventsArr.push(
        {
          title: e[keyVal].general,
          color: colors[e[keyVal].general],
          start: new Date(Number(keyVal)),
          meta: e[keyVal]
        }
      );
      console.log(e,colors[e[keyVal]], e[keyVal]);
    })
    self.events = self.events.concat(tempEventsArr);
    console.log(self.allData);
    console.log("Events", self.events);
  }
}