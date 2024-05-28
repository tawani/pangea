import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `   
  <div class="flex-c xredline">
    <app-announcements></app-announcements>
    <div class="flex-c flex1 xblueline">
      <router-outlet></router-outlet>
    </div>
  </div>
  `,
})
export class AppComponent {
  name = 'Angular Demo';
}
