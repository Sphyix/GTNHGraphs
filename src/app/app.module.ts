import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphService } from './graph/graph.service';
import { GraphComponent } from './graph/graph/graph.component';
import { DetailGraphComponent } from './detailGraph/detail-graph/detail-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    DetailGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  
  providers: [GraphService, HttpClientModule, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
