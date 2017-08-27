import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InputComponent } from './input.component';
import { CalenderComponent } from './calender.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
  	InputComponent,
  	CalenderComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
    	{
    		path: '',
    		redirectTo: '/input',
    		pathMatch: 'full'
    	},
	    {
	    	path: 'input',
	    	component: InputComponent
	    },
	    {
	    	path: 'calender',
	    	component: CalenderComponent
	    }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
