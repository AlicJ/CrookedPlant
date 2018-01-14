import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { DayViewHour, DayViewEvent } from 'calendar-utils';
import { colors } from './demo-utils/colors';
import * as Chart from 'chart.js';
Chart.defaults.global.defaultFontColor = 'black';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  allDate = []
  allDays = []
  selectedDay = {};

  allData: any;
  canvas: any;
  ctx: any;
  myChart: any;
  chartdata: any;
  graphColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'green',
    '#ff1f01',
    '#0077b9',
    '#ff7c35',
    '#003fb3',
    '#e475d2',
    '#cfc72f',
    '#005276',
    '#ab7f1d',
    '#ffdfaf',
    '#ffeaaa',
    '#c2f0f3',
  ];

  view: string = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  dayView: DayViewHour[];
  clickedDate: Date;

  onSelect(day: Object): void {
    console.log("day selected", this);
  }

  dayClick(event) {
    console.log("DAYCLICKED", event.day, this.clickedDate === event.day.date);
    if (this.clickedDate && this.clickedDate === event.day.date) {
      return;
    }
    this.clickedDate = event.day.date;
    if (event.day.events[0]) this._renderDayGraph(event.day.events);
  }

  _renderGraph(settings) {
    console.log("RenderGraph");
    this.myChart.destroy();
    this.myChart = new Chart(this.ctx, settings);
  }

  _renderDayGraph(eData) {
    console.log("RenderDayGraph");
    let entry = eData[0];
    let text = entry.meta ? entry.meta.input : "???";
    let emotionBreakDown = entry.meta.emotion[0];
    let label = entry.meta.general;
    let fontColor = entry.color.primary;

    this._renderGraph({
      type: 'doughnut',
      data: {
        labels: Object.keys(emotionBreakDown),
        datasets: [{
          data: Object.values(emotionBreakDown),
          borderWidth: 10,
          backgroundColor: this.graphColors,
        }]
      },
      options: {
        responsive: true,
        title: {
          text: "Emotion: " + label,
          display: true
        }
      }
    });
  }

  headerClicked(evt, obj) {
    console.log("headerClicked", evt);
    console.log("headerClicked", obj);
  }

  wkEvents(events: CalendarEvent[]) {
    console.log("wkEvents", events);
    let fAndL = this.oGetFirstAndLastDaysOfWeek(this.viewDate);
    let filteredEvents = events.filter((v, i) => { return this.bSameWeek(v.start, fAndL.firstDate, fAndL.lastDate) });
    console.log("filteredEvents", filteredEvents);
    this._renderWeek(filteredEvents);
    return events
  }


  _renderWeek(wkData) {
    let angerData = [], fearData = [], joyData = [], sadnessData = [], surpriseData = [];
    wkData.forEach((v, i) => {
      angerData.push(v.meta.emotion[0].anger);
      fearData.push(v.meta.emotion[0].fear);
      joyData.push(v.meta.emotion[0].joy);
      sadnessData.push(v.meta.emotion[0].sadness);
      surpriseData.push(v.meta.emotion[0].sadness);
    });

    console.log("RenderWeekGraph");
    // let label = entry.meta.general;
    // let fontColor = entry.color.primary;

    this._renderGraph({
      type: 'line',
      data: {
        // labels: Object.keys(emotionBreakDown),
        labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Friday', 'Sat'],
        
        datasets: [{
          label:"Anger",
          borderWidth: 5,
          data: angerData,
          lineTension: 0,
          borderColor: this.graphColors[0],
        },{
          label:"Fear",
          borderWidth: 5,
          data: fearData,
          lineTension: 0,
          borderColor: this.graphColors[1],
        },{
          label:"Joy",
          borderWidth: 5,
          data: joyData,
          lineTension: 0,
          borderColor: this.graphColors[2],
        },{
          label:"Sadness",
          borderWidth: 5,
          data: sadnessData,
          lineTension: 0,
          borderColor: this.graphColors[3],
        },{
          label:"Surprise",
          borderWidth: 5,
          data: surpriseData,
          lineTension: 0,
          borderColor: this.graphColors[4],
        }]
      },
      options: {
        responsive: true,
        title: {
          text: "Emotion Week",
          display: true
        }
      }
    });



  }

  oGetFirstAndLastDaysOfWeek(day: Date) {
    let lastDate = new Date(day);

    switch (lastDate.getDay()) {
      case 0:
        lastDate.setDate(lastDate.getDate() + 6);
        break;
      case 1:
        lastDate.setDate(lastDate.getDate() + 5);
        break;
      case 2:
        lastDate.setDate(lastDate.getDate() + 4);
        break;
      case 3:
        lastDate.setDate(lastDate.getDate() + 3);
        break;
      case 4:
        lastDate.setDate(lastDate.getDate() + 2);
        break;
      case 5:
        lastDate.setDate(lastDate.getDate() + 1);
        break;
      default:
        break;
    }

    let firstDate = new Date(lastDate);
    firstDate.setDate(lastDate.getDate() - 7);

    console.log("Week?", firstDate, lastDate);

    let fAndL = { "firstDate": firstDate, "lastDate": lastDate };

    return fAndL;
  }


  bSameWeek(day: Date, start: Date, end: Date) {
    return (day.getUTCFullYear() >= start.getUTCFullYear()) &&
      (day.getUTCFullYear() <= end.getUTCFullYear()) &&
      (day.getUTCMonth() >= start.getUTCMonth()) &&
      (day.getUTCMonth() <= end.getUTCMonth()) &&
      (day.getUTCDate() >= start.getUTCDate()) &&
      (day.getUTCDate() <= end.getUTCDate());
  }



  eventSqr(events: CalendarEvent[]) {
    console.log("[events]", events);
    let filteredEvents = events.filter((v, i) => { return this.bSameDate(this.viewDate, v.start) });
    console.log("filteredEvents", filteredEvents);
    if (filteredEvents[0]) this._renderDayGraph(filteredEvents);
    return events
  }

  bSameDate(day1: Date, day2: Date) {
    return day1.getUTCFullYear() == day2.getUTCFullYear() &&
      day1.getUTCMonth() == day2.getUTCMonth() &&
      ((day1.getUTCDate() == day2.getUTCDate()) || (day1.getUTCDate() == (new Date()).getUTCDate()))
  }

  ngOnInit(self = this): void {
    self.allData = JSON.parse(localStorage.getItem('allData'));

    if (!self.allData) throw ("Initialize localhost by runnning CrookedPlant/allData.txt");

    $.each(self.allData, function (key, value) {
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
    self.allData.forEach((e, i) => {
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
    console.log(self.allData);
    console.log("Events", self.events);
  }


  ngAfterViewInit(self = this): void {
    console.log();


    self.chartdata = {};
    var tempAllData = Array(self.allData)[0];
    tempAllData.forEach((v, i, k) => { self.chartdata[Object.values(v)[0].general] = 0 });
    tempAllData.forEach((v, i, k) => { self.chartdata[Object.values(v)[0].general] += 1 });

    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(self.chartdata),
        datasets: [{
          label: 'Count',
          data: Object.values(self.chartdata),
          backgroundColor: this.graphColors,
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