import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: "Main", url: '/' },
        { title: "ProgressBar", url: 'progress' },
        { title: "Gráficas", url: 'graficas1' },
        { title: "Promesas", url: 'promesas' },
        { title: "RXJS", url: 'rxjs' }
      ]
    }
  ]

  constructor() { }
}
