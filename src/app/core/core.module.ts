import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { CachingModule } from "./cacheing/cacheing.module";
import { HeaderModule } from "./header/header.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";



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
