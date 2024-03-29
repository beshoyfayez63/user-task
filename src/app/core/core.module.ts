import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { HeaderModule } from "./header/header.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CachingModule } from "./caching/caching.module";



@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    CachingModule,
    HeaderModule,
  ],
  exports: [HeaderModule]
})
export class CoreModule { }
