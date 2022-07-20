import { formatDate } from '@angular/common';
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
  deltaData: any;
  epsilonData: any;
  etaData: any;
  zetaData: any;

  updateFrequency: number = 15000;

  deltaOptions: any;
  deltaUpdateOptions: any;
  epsilonOptions: any;
  epsilonUpdateOptions: any;
  etaOptions: any;
  etaUpdateOptions: any;
  zetaOptions: any;
  zetaUpdateOptions: any;

  private timer: any;

  private deltaLastUpdateTime: any = 0;
  private epsilonLastUpdateTime: any = 0;
  private etaLastUpdateTime: any = 0;
  private zetaLastUpdateTime: any = 0;


  ngOnInit() {
    this.deltaData = [];
    this.epsilonData = [];
    this.etaData = [];
    this.zetaData = [];
    this.firstDeltaLoad();
    this.firstEpsilonLoad();
    this.firstEtaLoad();
    this.firstZetaLoad();
  }

  firstDeltaLoad() {
    this.service.getDelta().subscribe((res) => {
      res.forEach((element: DimData) => {
        let values: Array<any>;
        const date: Date = new Date(element.updateTime * 1000);
        const sDate = formatDate(date, 'yyyy/MM/dd HH:mm:ss', 'en-US');
        values = [sDate, element.ms];
        if (element.dimId == 999999) {
          this.deltaData.push({ name: element.updateTime + '', value: values });
          this.deltaLastUpdateTime = element.updateTime;
        }
      });
      this.loadDeltaGraphData();
      this.updateDeltaGraph();
    });
  }

  updateDeltaGraph() {
    this.timer = setInterval(() => {
      let index = this.deltaData.length;
      this.service.getDelta().subscribe((res) => {
        res.forEach((element: DimData) => {
          let values: Array<any>;
          const date: Date = new Date(element.updateTime * 1000);
          const sDate = formatDate(date, 'yyyy/MM/dd HH:mm:ss', 'en-US');
          values = [sDate, element.ms];
          if (element.dimId == 999999 && element.updateTime > this.deltaLastUpdateTime) {
            this.deltaData.push({ name: element.updateTime + '', value: values });
            this.deltaLastUpdateTime = element.updateTime;
          }
        });
        for (index; index < this.deltaData.length; index++) {
          this.deltaData.shift();
        }
        // update series data:
        this.deltaUpdateOptions = {
          series: [{
            data: this.deltaData
          }]
        };
      });
    }, this.updateFrequency);
  }

  loadDeltaGraphData() {
    //this.data = [];
    // this.value = Math.random() * 1000;
    // for (let i = 0; i < 1000; i++) {
    //   this.data.push(this.randomData());
    // }

    // initialize chart options:
    this.deltaOptions = {
      title: {
        text: 'Delta Overall'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date: Date = new Date(params.value[0]);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' | ' + params.value[1] + " ms";
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
        name: 'Delta Overall',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.deltaData
      }]
    };
  }

  firstEpsilonLoad() {
    this.service.getEpsilon().subscribe((res) => {
      res.forEach((element: DimData) => {
        let values: Array<any>;
        const date: Date = new Date(element.updateTime * 1000);
        const sDate = formatDate(date, 'yyyy/MM/dd HH:mm:ss', 'en-US');
        values = [sDate, element.ms];
        if (element.dimId == 999999) {
          this.epsilonData.push({ name: element.updateTime + '', value: values });
          this.epsilonLastUpdateTime = element.updateTime;
        }
      });
      this.loadEpsilonGraphData();
      this.updateEpsilonGraph();
    });
  }

  updateEpsilonGraph() {
    this.timer = setInterval(() => {
      let index = this.epsilonData.length;
      this.service.getEpsilon().subscribe((res) => {
        res.forEach((element: DimData) => {
          let values: Array<any>;
          const date: Date = new Date(element.updateTime * 1000);
          const sDate = formatDate(date, 'yyyy/MM/dd HH:mm:ss', 'en-US');
          values = [sDate, element.ms];
          if (element.dimId == 999999 && element.updateTime > this.epsilonLastUpdateTime) {
            this.epsilonData.push({ name: element.updateTime + '', value: values });
            this.epsilonLastUpdateTime = element.updateTime;
          }
        });
        for (index; index < this.epsilonData.length; index++) {
          this.epsilonData.shift();
        }
        // update series data:
        this.epsilonUpdateOptions = {
          series: [{
            data: this.epsilonData
          }]
        };
      });
    }, this.updateFrequency);
  }

  loadEpsilonGraphData() {
    //this.data = [];
    // this.value = Math.random() * 1000;
    // for (let i = 0; i < 1000; i++) {
    //   this.data.push(this.randomData());
    // }

    // initialize chart options:
    this.epsilonOptions = {
      title: {
        text: 'Epsilon Overall'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date: Date = new Date(params.value[0]);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' | ' + params.value[1] + " ms";
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
        name: 'Delta Overall',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.epsilonData
      }]
    };
  }

  firstEtaLoad() {
    this.service.getEta().subscribe((res) => {
      res.forEach((element: DimData) => {
        let values: Array<any>;
        const date: Date = new Date(element.updateTime * 1000);
        const sDate = formatDate(date, 'yyyy/MM/dd HH:mm:ss', 'en-US');
        values = [sDate, element.ms];
        if (element.dimId == 999999) {
          this.etaData.push({ name: element.updateTime + '', value: values });
          this.etaLastUpdateTime = element.updateTime;
        }
      });
      this.loadEtaGraphData();
      this.updateEtaGraph();
    });
  }

  updateEtaGraph() {
    this.timer = setInterval(() => {
      let index = this.etaData.length;
      this.service.getEta().subscribe((res) => {
        res.forEach((element: DimData) => {
          let values: Array<any>;
          const date: Date = new Date(element.updateTime * 1000);
          const sDate = formatDate(date, 'yyyy/MM/dd HH:mm:ss', 'en-US');
          values = [sDate, element.ms];
          if (element.dimId == 999999 && element.updateTime > this.etaLastUpdateTime) {
            this.etaData.push({ name: element.updateTime + '', value: values });
            this.etaLastUpdateTime = element.updateTime;
          }
        });
        for (index; index < this.etaData.length; index++) {
          this.etaData.shift();
        }
        // update series data:
        this.etaUpdateOptions = {
          series: [{
            data: this.etaData
          }]
        };
      });
    }, this.updateFrequency);
  }

  loadEtaGraphData() {
    //this.data = [];
    // this.value = Math.random() * 1000;
    // for (let i = 0; i < 1000; i++) {
    //   this.data.push(this.randomData());
    // }

    // initialize chart options:
    this.etaOptions = {
      title: {
        text: 'Eta Overall'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date: Date = new Date(params.value[0]);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' | ' + params.value[1] + " ms";
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
        name: 'Delta Overall',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.etaData
      }]
    };
  }

  firstZetaLoad() {
    this.service.getZeta().subscribe((res) => {
      res.forEach((element: DimData) => {
        let values: Array<any>;
        const date: Date = new Date(element.updateTime * 1000);
        const sDate = formatDate(date, 'yyyy/MM/dd HH:mm:ss', 'en-US');
        values = [sDate, element.ms];
        if (element.dimId == 999999) {
          this.zetaData.push({ name: element.updateTime + '', value: values });
          this.zetaLastUpdateTime = element.updateTime;
        }
      });
      this.loadZetaGraphData();
      this.updateZetaGraph();
    });
  }

  updateZetaGraph() {
    this.timer = setInterval(() => {
      let index = this.zetaData.length;
      this.service.getZeta().subscribe((res) => {
        res.forEach((element: DimData) => {
          let values: Array<any>;
          const date: Date = new Date(element.updateTime * 1000);
          const sDate = formatDate(date, 'yyyy/MM/dd HH:mm:ss', 'en-US');
          values = [sDate, element.ms];
          if (element.dimId == 999999 && element.updateTime > this.zetaLastUpdateTime) {
            this.zetaData.push({ name: element.updateTime + '', value: values });
            this.zetaLastUpdateTime = element.updateTime;
          }
        });
        for (index; index < this.zetaData.length; index++) {
          this.zetaData.shift();
        }
        // update series data:
        this.zetaUpdateOptions = {
          series: [{
            data: this.zetaData
          }]
        };
      });
    }, this.updateFrequency);
  }

  loadZetaGraphData() {
    //this.data = [];
    // this.value = Math.random() * 1000;
    // for (let i = 0; i < 1000; i++) {
    //   this.data.push(this.randomData());
    // }

    // initialize chart options:
    this.zetaOptions = {
      title: {
        text: 'Zeta Overall'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date: Date = new Date(params.value[0]);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' | ' + params.value[1] + " ms";
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
        name: 'Delta Overall',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.zetaData
      }]
    };
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  chartCallback(chart: any) {
  }

}
