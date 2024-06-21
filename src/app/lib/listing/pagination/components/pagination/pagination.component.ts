import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import type { IPagination, IPaginationSettings } from "../../types/IPagination";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  host: {
    class: 'pagination'
  },
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements IPagination {
  route = inject(ActivatedRoute);
  router = inject(Router);

  totalResults = 0;
  totalPages = 0;
  clipPages = 0;
  rpp = 6;


  protected _page = 1;
  get page() {
    return +this.route.snapshot.queryParams['page'] || this._page;
  }
  set page(value: number) {
    this._page = value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {page: value}
    })
  }

  @Output() onPageChanged = new EventEmitter<number>();

  goToPrevPage() {
    if(this.page > 1) {
      this.changePage(this.page - 1);
    }
  }

  goToNextPage() {
    // to make sure the next page exist, may be page is equal 1 and totalPages is 1 also
    if(this.page + 1 <= this.totalPages) {
      this.changePage(this.page + 1);
    }
  }

  changePage(page: number) {
    this.page = page;
    this.onPageChanged.emit(page);
  }

  setPagination(settings: IPaginationSettings) {
    this.totalPages = settings.totalPages;
    this.totalResults = settings.totalItems;
    this.rpp = settings.rpp;
    this.clipPages = Math.ceil(
      this.totalPages - (this.totalPages - (this.page + 1)) / 2
    );
  }

  getCurrentPage() {
    return this.page;
  }

  goToFirstPage(){
    if(this.page > 1){
      this.changePage( 1);
    }
  }

  goToLastPage(){
    if(this.page < this.totalPages){
      this.changePage(this.totalPages);
    }
  }
}
