import { Component,AfterViewInit,OnChanges,OnDestroy,ViewChild,ElementRef,
	Input,ChangeDetectionStrategy } from '@angular/core';

declare var require:any;
const Highcharts = require('highcharts/highmaps.src');
import 'highcharts/adapters/standalone-framework.src';
import {worldMap} from '../../../../assets/js/world';

@Component({
  selector: 'app-dashboard-map-chart',
  templateUrl: './dashboard-map-chart.component.html',
  styleUrls: ['./dashboard-map-chart.component.scss']
})
export class DashboardMapChartComponent implements OnChanges,AfterViewInit {

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
	data = data.reduce((acc,user)=>{
		let found = acc.findIndex((item)=>item.name==user.country);
		if(found>=0){
			acc[found].value++;
		}else{
			acc.push({name:user.country,value:1});
		}

		return acc;
	},[])
	return data;
}

createChart(){
if (this.chartEl && this.chartEl.nativeElement) {
        let opts = {
        title:{
        	text:''
        },
         legend:{
		      itemStyle: {
		         color: '#c6aeae'
		      },
		      itemHoverStyle: {
		         color: '#877676'
		      },
        },
        chart: {
        	type:'map',
        	backgroundColor:null,
            map: worldMap,
            renderTo:this.chartEl.nativeElement
        },

         colorAxis: {
         	labels:{
         		style:{
         			color:'#fff'
         		}
         	},
        dataClasses: [{
            to: 2,
            color: this.currentTheme.map_pallete[0],
            name: 'Less than 2'
        }, {
            from: 2,
            to: 4,
            color: this.currentTheme.map_pallete[1],
            name: 'More than 2'
        }, {
            from:4,
            to: 5,
            color: this.currentTheme.map_pallete[2],
            name: 'More than 4'
        }, {
            from: 5,
            color: this.currentTheme.map_pallete[3],
            name: 'More than 6'
        }]
    },
    tooltip:{
      backgroundColor: this.currentTheme.main_color,
      style: {
         color: this.currentTheme.tooltip_font_color,
         opacity:0.8
      }
 	},
	plotOptions: {		
        map: {
            allAreas: true,
            joinBy: ['name'],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                style: {
                    fontWeight: 'bold'
                },
                 format: null,
                formatter: function () {
                    if (this.point.value > 10) {
                        return this.point.value;
                    }
                }            
            },
           
        }
    },
        mapNavigation: {
            enabled: true,
            enableDoubleClickZoomTo: true
        },

         series: [{
        name:'Users in',
        data: this.getData()
    }]
   
    }
    this._chart = new Highcharts.Map(opts)
}

}
}
