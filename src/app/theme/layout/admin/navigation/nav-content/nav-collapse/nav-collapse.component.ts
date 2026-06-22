import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem } from '../../navigation';
import { animate, style, transition, trigger } from '@angular/animations';
import { NextConfig } from '../../../../../../app-config';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-collapse',
  templateUrl: './nav-collapse.component.html',
  styleUrls: ['./nav-collapse.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', display: 'block' }),
        animate('250ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class NavCollapseComponent implements OnInit {
  public visible;
  @Input() item: NavigationItem;
  public flatConfig: any;
  public themeLayout: string;

  constructor(private router: Router) {
    this.visible = false;
    this.flatConfig = NextConfig.config;
    this.themeLayout = this.flatConfig.layout;
  }

  ngOnInit() {
    this.checkReportMenu();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkReportMenu();
      });
  }

  navCollapse(e) {

    let parent = e.target;
    if (this.themeLayout === 'vertical') {
      parent = parent.parentElement;
    }

    const sections = document.querySelectorAll('.pcoded-hasmenu');
    for (let i = 0; i < sections.length; i++) {
      if (sections[i] !== parent) {
        sections[i].classList.remove('pcoded-trigger');
      }
    }

    let firstParent = parent.parentElement;
    let preParent = parent.parentElement.parentElement;
    if (firstParent.classList.contains('pcoded-hasmenu')) {
      do {
        firstParent.classList.add('pcoded-trigger');
        // firstParent.parentElement.classList.toggle('pcoded-trigger');
        firstParent = firstParent.parentElement.parentElement.parentElement;
      } while (firstParent.classList.contains('pcoded-hasmenu'));
    } else if (preParent.classList.contains('pcoded-submenu')) {
      do {
        preParent.parentElement.classList.add('pcoded-trigger');
        preParent = preParent.parentElement.parentElement.parentElement;
      } while (preParent.classList.contains('pcoded-submenu'));
    }
    if (this.item.id === 'report') {
      this.visible = !this.visible;
    } else {
      parent.classList.toggle('pcoded-trigger');
    }
  }

  checkReportMenu() {
    if (this.item.id !== 'report') {
      return;
    }

    const url = this.router.url;

    this.visible =
      url.includes('/agent/alltransactionreport') ||
      url.includes('/agent/cancellationreport') ||
      url.includes('/agent/completereport') ||
      url.includes('/agent/commissionreport');

    console.log('REPORT MENU:', this.visible, url);
  }
}
