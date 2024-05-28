import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, BaseLayoutComponent } from './app-routing.module';

import { AppComponent } from './app.component';
import { AnnouncementsComponent } from './components/announcements';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [CoreModule, AppRoutingModule, AnnouncementsComponent],
  declarations: [AppComponent, BaseLayoutComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
