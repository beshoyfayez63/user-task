import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderInterceptor } from "./interceptors/loader.interceptor";
import { LoaderService } from "./services/loader.service";
import { LoaderComponent } from './components/loader/loader.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    LoaderComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    ProgressBarModule
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  exports: [LoaderComponent]
})
export class LoaderModule { }
