import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';
import { AutoComplete, AutoCompleteCompleteEvent } from "primeng/autocomplete";
import type { ISearchConfig } from "../../types/search-config";
import { BehaviorSubject, Subject, take } from "rxjs";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent<R extends any[]> implements OnDestroy {
  items = new BehaviorSubject<{ id: number, [key: string]: any }[]>([])
  count = 0;
  @ViewChild('searchComp', {read: AutoComplete}) searchComp?: AutoComplete

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
    this.config.getResults(event.query).pipe(take(1)).subscribe((data) => this.items.next(data))
  }

  ngOnDestroy() {
    this.unSub.next();
    this.unSub.complete();
  }
}
