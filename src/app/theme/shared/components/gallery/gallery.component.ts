import {Component, Input, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
 
  private subscription: Subscription;
  constructor(){}ngOnInit(): void {
  throw new Error('Method not implemented.');
}
  

  

}
