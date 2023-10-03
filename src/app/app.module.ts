import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RangeComponentComponent } from './components/range-component/range-component.component';
import { SignaturePadComponent } from './components/signature-pad/signature-pad.component';

@NgModule({
  declarations: [
    AppComponent,
    RangeComponentComponent,
    SignaturePadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
