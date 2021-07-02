import { Component, Input, OnInit } from '@angular/core';
import { DimData } from 'src/app/models/dimdata';
import { GraphService } from '../graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private service: GraphService) { }

  title = 'GTNHGraphs';

  @Input()
  data: any[] = new [];

  options: any;
  updateOptions: any;
  private oneDay = 24 * 3600 * 1000;
  private now: Date | undefined;
  private value: number | undefined ;
  private timer: any;

  arr: Array<{ name: string, data: number }> = Array<{ name: string, data: number }>();

  ngOnInit() {
    this.data = [];
    this.now = new Date(1997, 9, 3);
    this.value = Math.random() * 1000;
    for (let i = 0; i < 1000; i++) {
      this.data.push(this.randomData());
    }

    // initialize chart options:
    this.options = {
      title: {
        text: 'Dynamic Data + Time Axis'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date = new Date(params.name);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: 'Mocking Data',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.data
      }]
    };

    // Mock dynamic data:
    this.timer = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }

      // update series data:
      this.updateOptions = {
        series: [{
          data: this.data
        }]
      };
    }, 1000);

    // this.data = this.service.getHeroes().subscribe((res) => {

    //   res.forEach((element: DimData) => {
    //     this.arr.push( {name: element.updateTime + '', data: element.tps});
    //   });
    //   this.data = this.arr;
    //   console.log(this.data);
    // });  
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  randomData() {
    this.now = new Date(this.now.getTime() + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.round(this.value)
      ]
    };
  }

  chartCallback(chart: any) {
  }
  
  
}
