import { Component } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './input.component.html',
  styleUrls: ['./app.component.css']
})
export class InputComponent {

  input = '';
  storeData = {};
  suggestion = 'You should do something based on what you just input';

  
  sendInput = function (inputData = this.input) {
    $.post(
      'https://apiv2.indico.io/apis/multiapi/batch?apis=sentimenthq,keywords,people,personality,emotion',
      JSON.stringify({
          'api_key': "1b3568397ac4cf74ef9dfce04b1c6c57",
          'data': [this.input]
      })
    ).then(function(res) {

      var sd: StoreData = {
        "input" : inputData,
        emotion: [],
        people: [],
        sentimenthq: [],
        keywords: [],
        personality: []
      }
      
      $.each(JSON.parse(res).results, (k,v) => {
        sd[k] = v.results ? v.results : v.status;
      });
      var arr = JSON.parse(localStorage.getItem("allData")) || [];
      var newItem = {};
      newItem[$.now()] = sd;
      arr.push(newItem);
      localStorage.setItem("allData", JSON.stringify(arr));
    });
  }
}


class StoreData {
  "input": string;
    "emotion": Object[];
    "people":Object[];
    "sentimenthq":Object[];
    "keywords":Object[];
    "personality":Object[];
}