import { Component,AfterViewInit,OnChanges,OnDestroy,ViewChild,ElementRef,
	Input,ChangeDetectionStrategy } from '@angular/core';
declare var require:any;
const Highcharts = require('highcharts/highcharts.src');
import 'highcharts/adapters/standalone-framework.src';

@Component({
  selector: 'app-dashboard-primary-chart',
  templateUrl: './dashboard-primary-chart.component.html',
  styleUrls: ['./dashboard-primary-chart.component.scss']
})
export class DashboardPrimaryChartComponent implements OnChanges,AfterViewInit {
@Input() title;
@Input() options;
@Input() currentTheme;
@ViewChild('chart') chartEl:ElementRef;
_chart;
  constructor() { }

   ngOnChanges(changes){
    if(changes.currentTheme){
      this.createChart();
    }
  }
ngAfterViewInit(){
this.createChart();
}


getData(){
	let data = this.options.data;
	let extractFields = this.options.extract;
	let formattedData = data.filter(itemToFilter=>{
		let nowYear = new Date().getFullYear();
		return (new Date(itemToFilter.lastUpdated).getFullYear() == nowYear && itemToFilter.status == 'finalized');
	}).map((item)=>{
		let formatted=[];
		for(var key in extractFields){
			let field = extractFields[key];
			let itemField = item[field.name];
			if(field.type == 'date'){
				let dateField = new Date(itemField);
				formatted[0] = Date.UTC(dateField.getFullYear(),dateField.getMonth(),dateField.getDate());
			}else{
				formatted[1]=itemField;
			}
		}
		return formatted;
	})
	formattedData = formattedData.sort((a,b)=>a[0]-b[0]).reduce((acc,item)=>{
		let found = acc.findIndex(toFind=>item[0]==toFind[0]);
		if(found>=0){
			acc[found][1] = +(acc[found][1]+item[1]).toFixed();
		}else{
			acc.push(item);
		}
		return acc;
	},[]);
	formattedData = this.setRange(formattedData);
	return formattedData;
}


setRange(data){
	let range = this.options.range;
	let defaultRange;
	let firstValue;
	let defaultValue = 0;
	if(!range){
		let currentYear = new Date().getFullYear();
		let firstMonth = 0,firstDay = 0;
		firstValue = [Date.UTC(currentYear,firstMonth,firstDay),defaultValue];
	}
	data.unshift(firstValue);
	return data;
}

createChart(){
	let opts:any = {
    title: {
        text: ''
    },
     credits:{
        	enabled:false
        },
        legend:{
        	enabled:false
        },
    xAxis: {
         type: 'datetime',
        dateTimeLabelFormats: {
            month: '%b',
            year: '%b'
        },
        labels: {
         style: {
            color: '#877676'
         }
      }
       
    },
    yAxis: {
        title: {
            text: 'Purchase amount in USD',
       	    style:{
       	    	color: this.currentTheme.font_color
       	    }
        },
       labels: {
         style: {
            color: this.currentTheme.font_color
         }
      },
      	gridLineWidth:0,
        lineWidth:1,
        lineColor:'#E0E0E3',
        tickWidth:1,
        tickLength:8,
        tickColor:'#E0E0E3',
    },
    tooltip: {
    	crosshairs:[{
    		color:'#5D5D5D',
    		dashStyle:'dash',
    		width:1
    	},{
    		color:'#5D5D5D',
    		dashStyle:'dash',
    		width:1
    	}],
    	 backgroundColor: this.currentTheme.main_color,
      style: {
         color:  this.currentTheme.tooltip_font_color,
         opacity:0.8
      }
    },
    plotOptions: {
        areaspline: {
        	animation:{
        		duration:1500,
        		easing:'swing'
        	},
            marker: {
                enabled: true,
                symbol: 'circle',
                radius: 5
            }
        }
    },
    series: [{
        name: 'Total purchase for day',
        data: this.getData()
    }],
    colors: [ this.currentTheme.main_color]
};
 if (this.chartEl && this.chartEl.nativeElement) {
        opts.chart = {
            type: 'areaspline',
            backgroundColor: null,
            plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false,
            renderTo: this.chartEl.nativeElement
        };

        this._chart = new Highcharts.Chart(opts);
    }
}



}
