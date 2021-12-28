import { Component, Input, OnInit } from '@angular/core';

import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() title: string = "Sin titulo";

  @Input('labels')
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data')
  public doughnutChartData: MultiDataSet = [[350, 450, 100]];
  /**
 * Tener cuidado con la version, instalar: 
 * 
 * npm install --save ng2-charts@2.3.0
 * npm install --save chart.js@2.9.3
 */
  // Doughnut
  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
