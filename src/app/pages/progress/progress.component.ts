import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progreso1: number = 15;
  progreso2: number = 75;

  get getProgreso1() {
    return `${this.progreso1}%`;
  }

  set setProgreso1(valorNuevo) {
    this.progreso1 = valorNuevo;
  }

  get getProgreso2() {
    return `${this.progreso2}%`;
  }

}
