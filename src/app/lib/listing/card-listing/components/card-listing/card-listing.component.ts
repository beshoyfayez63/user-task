import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  inject
} from '@angular/core';
import { ICardListConfig } from "../../types/ICardListConfig";
import { Observable, map, of, startWith, switchMap, tap } from "rxjs";
import { IPagination } from "../../../pagination/types/IPagination";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.component.html',
  styleUrl: './card-listing.component.scss',
  host: {
    class: 'list-container'
  }
})
export class CardListingComponent<Res, Data extends object[]> implements OnInit {

  route = inject(ActivatedRoute);

  @Input({required: true}) config!: ICardListConfig<Res, Data>;
  @Input({ required: true }) pagination?: IPagination;

  data?: Observable<Data>;

  @ContentChild('cardTemplate', {read: TemplateRef}) cardTemplates?: TemplateRef<any>;

  ngOnInit() {
    this.data = this.pagination?.onPageChanged.pipe(
      startWith(this.pagination.page || 1),
      switchMap(page => this.setData(page)),
    )
  }

  setData(page: number) {
    return this.config.getData(page).pipe(
      switchMap(data => {
        this.pagination?.setPagination({
          ...this.config.paginationMapper(data),
          page,
        })
        return this.config.dataMapper(data)
      })
    );
  }

}
