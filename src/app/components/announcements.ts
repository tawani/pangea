import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

/**
 * @title Exclusive selection
 */
@Component({
  selector: 'app-announcements',
  standalone: true,
  //imports: [MatButtonToggleModule, MatIconModule],
  template: `
  @if(show){
  <div style="display:flex;padding:10px 20px;background-color:wheat;">
  <div style="flex:1;">This is an announcement</div>
  <div><button (click)="show = !show" type="button">X</button> </div>
</div>
  }
  @if(show2){
<div style="display:flex;padding:10px 20px;background-color:lightblue;">
  <div style="flex:1;">This is an announcement</div>
  <div><button (click)="show2 = !show2" type="button">X</button> </div>
</div>
  }
  `,
})
export class AnnouncementsComponent {
  show = false;
  show2 = false;
}
