import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class ThemeService {
currentTheme:BehaviorSubject<string> = new BehaviorSubject('default');
currentTheme$ = this.currentTheme.asObservable();
defaultTheme:any={};
lightTheme:any={};
themes:any[]=[];

  constructor() {
this.createThemes();
   }




changeTheme(themeName){
	this.currentTheme.next(themeName);
}

createThemes(){
	this.defaultTheme={
		name:'default',
		main_color:'#5c6bc0',
		font_color:'#fff',
		tooltip_font_color:'#fff',
		map_pallete:['#ce93d8','#ab47bc','#8e24aa','#4a148c']
	};
	this.lightTheme={
		name:'light',
		main_color:'#09151B',
		font_color:'#09151B',
		tooltip_font_color:'#fff',
		map_pallete:['#e0e0e0','#9e9e9e','#616161','#212121']
	}
	this.themes.push(this.defaultTheme,this.lightTheme);
}

getTheme(themeName){

	return this.themes.find((theme)=>themeName==theme.name);
}
}
