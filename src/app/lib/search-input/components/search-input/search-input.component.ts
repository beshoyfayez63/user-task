import { Component, ContentChild, EventEmitter, Input, OnDestroy, Output, TemplateRef } from '@angular/core';
import { AutoCompleteCompleteEvent } from "primeng/autocomplete";
import type { ISearchConfig } from "../../types/search-config";
import { map, Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent<R extends any[]> implements OnDestroy {

  items: { id: string, [key: string]: any }[] = []

  selectedItem: { id: string, [key: string]: any } | null = null;

  @ContentChild('customOption') customOption?: TemplateRef<any>;
  @Input({required: true}) config!: ISearchConfig<R>;
  @Input() dataKey = 'id';
  @Input() optionLabel = 'first_name';
  @Input() selectedItemLabel = 'id'
  @Input() placeholder = '';
  @Output() onSelectItem = new EventEmitter<{id: string, [key: string]: any} | null>();

  private unSub = new Subject<void>();

  search(event: AutoCompleteCompleteEvent) {
    this.config.getResults(event.query)
      .pipe(takeUntil(this.unSub))
      .subscribe(data => this.items = data)
  }

  ngOnDestroy() {
    this.unSub.next();
    this.unSub.complete();
  }
}
