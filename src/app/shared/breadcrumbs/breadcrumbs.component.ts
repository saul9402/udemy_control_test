import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public actualPageTitle: string = "";

  public titleSubs$: Subscription;

  constructor(private router: Router) {

    this.titleSubs$ = this.getDataRoute()
      .subscribe(({ title }) => {
        this.actualPageTitle = title;
        document.title = `Admin Pro - ${this.actualPageTitle}`;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getDataRoute() {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((eventActivationEnd: ActivationEnd) => eventActivationEnd.snapshot.firstChild === null),
        map((eventFirstChild: ActivationEnd) => eventFirstChild.snapshot.data)
      );
  }

}
