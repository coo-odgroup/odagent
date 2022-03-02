import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,private auth: AuthService) {

    this.auth.getToken().subscribe(
      res=>{
        localStorage.setItem('APIAccessToken',res.data.access_token);         
      }
    );

   }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
