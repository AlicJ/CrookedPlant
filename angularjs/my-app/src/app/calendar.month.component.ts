import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './calendar.month.component.html',
  styleUrls: ['./app.component.css']
})
export class CalendarMonthComponent implements OnInit {

  allData = JSON.parse(localStorage.getItem('allData'));
  allDate = []
  allDays = []
  selectedDay = {};

  onSelect(day: Object): void {
    this.selectedDay = day;
  }

  showDayDetail(): void {

  }

  // twoHighestEmotion = function (emotions) {
  //   var sortable = [];
  //   $.each(emotions, (k,v) => {
  //        sortable.push([k, v]);
  //     });
  //   var sorted = sortable.sort(function(a,b) {
  //     return b[1] - a[1];
  //   });

  //   console.log('sortable', sortable);

  //   var highestTwo = [
  //     {
  //       'emotion': sortable[0][0],
  //       'score': sortable[0][1]
  //     },
  //     {
  //       'emotion': sortable[1][0],
  //       'score': sortable[1][1]
  //     }
  //   ];

  //   return highestTwo;
  // };

  // getGeneralEmotion = function (emotions, self = this) {
  //   var highestTwo = self.twoHighestEmotion(emotions);
  //   var first = highestTwo[0];
  //   var second = highestTwo[1];
  //   var final = 'mixed';

  //   console.log(first, second);

  //   if (first.emotion == 'anger') {
  //     if (second.emotion == 'joy') {
  //       final = 'mixed';
  //     }
  //     else if (second.emotion == 'fear') {
  //       if (first.score >= 0.5) {
  //         final = 'angry';
  //       }else if (second.score > 0.5) {
  //         final = 'fear';
  //       }else {
  //         final = 'mixed';
  //       }
  //     }
  //     else if (second.emotion == 'sadness') {
  //       if (first.score >= 0.5) {
  //         if (second.score >= 0.5) {
  //           final = 'frustrated';
  //         } else {
  //           final = 'angry';
  //         }
  //       } else {
  //         if (second.score >= 0.5) {
  //           final = 'sad';
  //         } else {
  //           final = 'mixed';
  //         }
  //       }
  //     }
  //     else if (second.emotion == 'surprise') {
  //       if (first.score < 0.5 && second.score < 0.5) {
  //         final = 'calm';
  //       }else {
  //         final = 'angry';
  //       }
  //     }
  //   }

  //   else if (first.emotion == 'joy') {
  //     if (second.emotion = 'fear') {
  //       if (first.score < 0.5 && second.score < 0.5) {
  //         final = 'mixed';
  //       }else {
  //         final = 'nervous';
  //       }
  //     }
  //     else if (second.emotion == 'sadness') {
  //       final = 'mixed';
  //     }
  //     else if (second.emotion == 'surprise') {
  //       if (second.score >= 0.5) {
  //         final = 'astonished';
  //       } else if (first.score >= 0.5) {
  //         final = 'happy';
  //       } else {
  //         final = 'calm';
  //       }
  //     }
  //   }

  //   else if (first.emotion == 'fear') {
  //     if (second.emotion == 'sadness') {
  //       if (second.score >= 0.5) {
  //         final = 'depressed';
  //       } else if (first.score >= 0.5) {
  //         final = 'fear';
  //       } else {
  //         final = 'sad';
  //       }
  //     }

  //     else if (second.emotion == 'surprise') {
  //       if (first.score >= 0.5) {
  //         if (second.score >= 0.5) {
  //           final = 'terrified';
  //         } else {
  //           final = 'fear';
  //         }
  //       }else {
  //         if (second.score >= 0.5) {
  //           final = 'surprised';
  //         } else {
  //           final = 'mixed';
  //         }
  //       }
  //     }
  //   }

  //   else if (first.emotion == 'fear') {
  //     if (second.emotion == 'surprise') {
  //       final = 'disbelief';
  //     }
  //   }

  //   return final;
  // };

  ngOnInit(self = this): void {
  	$.each(self.allData, function(key, value){
  		self.allDate.push(Object.keys(value)[0]);
  	});
	self.allDays = Object.keys(self.allData);
	// $.each(self.allData, function(key, value){
	// 	self.allDays[key]=parseInt(value);
	// })
	self.allData.reverse();
  	console.log(self.allDays)
  }



}