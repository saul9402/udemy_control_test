import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  public labels1: Label[] = ['Download', 'In-Store Sales', 'Mail-Order Sales'];
  public data1: MultiDataSet = [[1000, 450, 100]];

  constructor() { }

  ngOnInit() {
  }

}
