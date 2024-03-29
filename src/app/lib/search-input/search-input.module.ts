import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    AutoCompleteModule,
    FormsModule
  ],
  exports: [SearchInputComponent]
})
export class SearchInputModule { }
