import { Component,AfterViewInit,OnInit,OnDestroy,ViewChild,ElementRef,
	Input,ChangeDetectionStrategy,OnChanges } from '@angular/core';
declare var require:any;
const Highcharts = require('highcharts/highcharts.src');
import 'highcharts/adapters/standalone-framework.src';


@Component({
  selector: 'app-dashboard-info-card',
  templateUrl: './dashboard-info-card.component.html',
  styleUrls: ['./dashboard-info-card.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DashboardInfoCardComponent implements AfterViewInit,OnInit,OnChanges,OnDestroy{
@Input() card;
@Input() currentTheme;
@ViewChild('chart') chartEl:ElementRef;
amount=0;
amount2=0;
percentage=0;
increaseEnabled = false;
_chart;
  constructor() { 
  }

  ngAfterViewInit() {	
  	this.createChart();	 
  }

  ngOnInit(){
    this.amount = this.card.data.slice_1.data;
   	this.amount2 = this.card.data.slice_2.data;
    this.percentage = this.getDataPercentage(this.card.data,this.card.type); 
  }
  ngOnChanges(changes){
    if(changes.currentTheme){
      this.createChart();
    }
  }
createChart(){
  let opts: any = {
        title: {
            text: '',
        },
         tooltip: {
       backgroundColor: this.currentTheme.main_color,
      style: {
         color:  this.currentTheme.tooltip_font_color,
         opacity:0.8
      }
    },
         plotOptions: {
        pie: {
            dataLabels: {
                enabled: false,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: 0,
            endAngle: 360,
            center: ['50%', '50%']
        }
    },
        series: [{
        	type:'pie',
            name:'Amount',
            innerSize:'75%',
            data: [
               {name:this.card.data.slice_1.title,
               	y:this.card.data.slice_1.data,
               	color:this.currentTheme.main_color},
               {name:this.card.data.slice_2.title,
               	y:this.card.data.slice_2.data,
               	color:'none',borderColor:'#c6aeae'}
            ]
        }]
    };

    if (this.chartEl && this.chartEl.nativeElement) {
        opts.chart = {
            type: 'pie',
            backgroundColor: null,
            plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false,
            renderTo: this.chartEl.nativeElement
        };

        this._chart = new Highcharts.Chart(opts);
    }
}


getDataPercentage(data,type){
	let slice1 = data.slice_1.data,
  slice2 = data.slice_2.data,
	percentage;
	if(type =='current_purchases'){
		this.increaseEnabled = true; 
	}
		let total = slice1 + slice2;
		percentage = (slice1/total);
		return +percentage;
}

ngOnDestroy(){
	
}

}
