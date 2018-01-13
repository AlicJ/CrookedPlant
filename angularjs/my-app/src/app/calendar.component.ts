import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { DayViewHour } from 'calendar-utils';
import { colors } from './demo-utils/colors';
import * as Chart from 'chart.js';
Chart.defaults.global.defaultFontColor = 'black';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  // allData = JSON.parse(localStorage.getItem('allData'));
  allDate = []
  allDays = []
  selectedDay = {};
  
  allData : any;
  canvas: any;
  ctx: any;
  chartdata : any;

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
    self.allData = JSON.parse(localStorage.getItem('allData'));
    
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
      // console.log(e,colors[e[keyVal]], e[keyVal]);
    })
    self.events = self.events.concat(tempEventsArr);
    // console.log(self.allData);
    // console.log("Events", self.events);
  }


  ngAfterViewInit(self = this): void {
    self.chartdata = {};
    var tempAllData = Array(self.allData)[0];
    tempAllData.forEach((v,i,k) => {self.chartdata[Object.values(v)[0].general]=0});
    tempAllData.forEach((v,i,k) => {self.chartdata[Object.values(v)[0].general]+=1});

    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: Object.keys(self.chartdata),
          datasets: [{
              label: 'Count',
              data: Object.values(self.chartdata),
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'red'
              ],
              borderWidth: 10
          }]
      },
      options: {
        responsive: false,
        title: {
          text: "All Emotions",
          display: true
        }
      }
    });
  }
}