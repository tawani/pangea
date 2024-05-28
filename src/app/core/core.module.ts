import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { httpInterceptorProviders } from "./services";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,    
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],  
})
export class CoreModule { }
